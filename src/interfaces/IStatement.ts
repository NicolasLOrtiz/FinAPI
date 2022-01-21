export interface IStatement {
  date: Date;
  amount: number;
  type: "debit" | "credit";
  description?: string;
}
