import mongoose, { ClientSession } from "mongoose";
import ILogRepository from "../../../Application/Persistences/IRepositories/ILogRepository";
import { LogWithBase } from "../../../Domain/Entities/LogEntities";

class LogRepository implements ILogRepository{

    async createLog(data:any,session: ClientSession): Promise<typeof LogWithBase>{
        try {
            const log : any = await LogWithBase.create([{
                majorId: new mongoose.Types.ObjectId(data.majorId),
                subjectId: new mongoose.Types.ObjectId(data.subjectId),
                userId: new mongoose.Types.ObjectId(data.userId)
            }],{session})
            return log[0];
        } catch (error:any) {
            throw new Error(
                "Error at createUser in SubjectRepository: " + error.message
            );            
        }
    }
}

export default LogRepository;
