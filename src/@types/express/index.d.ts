declare namespace Express {
  export interface Request {
    customer: import("../../interfaces/ICustomer").ICustomer;
  }
}
