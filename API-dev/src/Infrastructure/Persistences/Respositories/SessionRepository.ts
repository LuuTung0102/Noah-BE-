import mongoose, { ClientSession } from "mongoose";
import ISessionRepository from "../../../Application/Persistences/IRepositories/ISessionRepository";
import { SessionLogin, SessionWithBase } from "../../../Domain/Entities/SessionEntites";
import { UnitOfWork } from "../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import BaseRepository from "./BaseRepository";
import { promises } from "dns";
class SessionRepository extends BaseRepository<typeof SessionLogin> implements ISessionRepository {
    constructor() {
        const collectionName: string = "sessions";
        super(collectionName);
    }
    async findSessionByEmail(queryData: any): Promise<typeof SessionWithBase[]> {
        try {
            const {email, isDelete, isActive} = queryData;
            const query = {
                email: email,
                isDelete: isDelete,
                isActive: isActive
            }
            const session: typeof SessionWithBase[] = await SessionWithBase.find(query);
            return session;
          
        } catch (error:any) {
            throw new Error("Error at findSessionByEmail in SessionRepository: " + error.message);
        }
    }

    async findSessionByEmailAndIP(queryData: any): Promise<typeof SessionWithBase | null> {
        try {
            const query = {
                email: queryData.email,
                ipAddress: queryData.ipAddress,
                deviceId: queryData.deviceId,
                isDelete: queryData.isDelete
            }
            // if (sessions === null || sessions.length <= 0) {
            //     throw new Error('No session found!');
            // }
            const session: typeof SessionWithBase[] = await SessionWithBase.find(query);
            if(session == null) return null;
            return session[0];
        } catch (error: any) {
            throw new Error("Error at findSessionByEmailAndIP in SessionRepository: " + error.message);
        }
    }



    
    async deleteSession(_id: string, session: ClientSession): Promise<void> {
        try {
            const query = {
                _id: new mongoose.Types.ObjectId(_id)
            }
            //await this.deleteDocument(query);
            await SessionWithBase.deleteOne(query, {session})
        } catch (error: any) {
            throw new Error("Error at deleteSession in SessionRepository: " + error.message);
        }

    }

    async createSession(sessionData: any, session: ClientSession): Promise<typeof SessionWithBase>{

        try {
            //const fullSession = new SessionWithBase(sessionData)
            //await this.insertDocuments(fullSession);
           
            const fullSession: any = await SessionWithBase.create([sessionData], {session});
            return fullSession[0];
        } catch (error: any) {
            throw new Error("Error at createSession in SessionRepository: " + error.message);
        }
    }
    
    async findSessionByToken(token: any): Promise<any>{
        try {
            const query = {
                jwttoken: token,
                isDelete: false,
            };
            const session = await SessionWithBase.find(query);
            if(session == null) return null;
            return session[0];
        } catch (error: any) {
            throw new Error("Error at findSessionByToken in SessionRepository: " + error.message);
        }

    }
}

export default SessionRepository;