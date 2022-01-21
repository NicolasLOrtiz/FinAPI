import { ICustomer } from "../../interfaces/ICustomer";

declare global {
  declare namespace Express {
    export interface Request {
      customer: ICustomer;
    }
  }
}
