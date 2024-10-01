import { ClientSession } from "mongoose";

export interface IBaseUnitOfWork {
    startTransaction(): Promise<ClientSession>;
    commitTransaction(): Promise<void>;
    commitTransactionWithoutEndSession(): Promise<void>
    abortTransaction(): Promise<void>;
}