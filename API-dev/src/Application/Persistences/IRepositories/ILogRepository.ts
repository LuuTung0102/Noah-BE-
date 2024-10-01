import mongoose, { ClientSession } from "mongoose";
import { LogWithBase } from "../../../Domain/Entities/LogEntities";

export default interface ILogRepository {
    createLog(createLogData: any, session: ClientSession): Promise<typeof LogWithBase>;
}
