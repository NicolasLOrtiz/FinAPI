import express, { NextFunction, request, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { ICustomer } from "./interfaces/ICustomer";
import { IStatement } from "./interfaces/IStatement";

const app = express();

app.use(express.json());

const customers: ICustomer[] = [];

const verifyCustomerExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.headers;

  const customer = customers.find((customer) => customer.id === token);

  if (!customer) return res.status(400).json({ error: "Customer not found" });

  req.customer = customer;

  return next();
};

const getBalance = (statement: IStatement[]) => {
  return statement.reduce((acc, statement) => {
    if (statement.type === "debit") {
      return acc - statement.amount;
    } else {
      return acc + statement.amount;
    }
  }, 0);
};

app.post("/account", (req, res) => {
  const { name, document, statement } = req.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.document === document
  );

  if (customerAlreadyExists)
    return res.status(400).json({ error: "Customer already exists" });

  const id = uuid();

  customers.push({
    id,
    name,
    document,
    statement: statement || [],
  });

  res.status(201).send({ name, document, statement, id });
});

app.get("/statement/:document", verifyCustomerExists, (req, res) => {
  const { customer } = req;

  return res.json(customer.statement);
});

app.post("/deposit", verifyCustomerExists, (req, res) => {
  const { customer } = req;
  const { amount, description } = req.body;

  customer.statement.push({
    date: new Date(),
    amount,
    type: "credit",
    description: description || "",
  });

  return res.status(201).json(customer.statement);
});

app.post("/withdraw", verifyCustomerExists, (req, res) => {
  const { customer } = req;
  const { amount, description } = req.body;

  const balance = getBalance(customer.statement);

  if (balance < amount)
    return res.status(400).json({ error: "Insufficient funds" });

  customer.statement.push({
    date: new Date(),
    amount,
    type: "debit",
    description: description || "",
  });

  return res.status(201).json(customer.statement);
});

app.get("/statement/date", verifyCustomerExists, (req, res) => {
  const { customer } = req;
  const { date } = req.query;

  const statement = customer.statement.filter((statement) => {
    const statementDate = statement.date.toLocaleDateString();
    return statementDate === date;
  });

  return res.json(statement);
});

app.put("/account", verifyCustomerExists, (req, res) => {
  const { customer } = req;
  const { name } = req.body;

  customer.name = name;

  return res.status(201).json(customer);
});

app.get("/account", verifyCustomerExists, (req, res) => {
  const { customer } = req;

  return res.json(customer);
});

app.delete("/account", verifyCustomerExists, (req, res) => {
  const { customer } = req;

  customers.splice(customers.indexOf(customer), 1);

  return res.send();
});

app.get("/balance", verifyCustomerExists, (req, res) => {
  const { customer } = req;

  const balance = getBalance(customer.statement);

  return res.json({ balance });
});

app.listen(3333, () => {
  console.log("Server started on port 3333");
});
