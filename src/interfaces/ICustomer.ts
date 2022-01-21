import { IStatement } from "./IStatement";

export interface ICustomer {
  id: string;
  name: string;
  document: string;
  statement?: IStatement[];
}
