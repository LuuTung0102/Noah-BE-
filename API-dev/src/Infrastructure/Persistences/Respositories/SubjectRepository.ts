import mongoose, { ClientSession } from "mongoose";
import { SubjectModelWithBase, SubjectWithBase } from "../../../Domain/Entities/SubjectEntities";
import { UserWithBase } from "../../../Domain/Entities/UserEntites";
import ISubjectRepository from "../../../Application/Persistences/IRepositories/ISubjectRepository";

class SubjectRepository implements ISubjectRepository {
   async GetAllSubjects(queryData: any): Promise<typeof SubjectWithBase[]>{
        try {
            const query: any = {
                isDelete: queryData.isDelete,
                isActive: queryData.isActive,
            }
            const subjects: typeof SubjectWithBase[] = await SubjectWithBase.find(query);
            return subjects;
        } catch (error:any) {
            throw new Error(
                "Error at createUser in SubjectRepository: " + error.message
            );
        }
    }


    async CreateSubject(subjectData: any, session: ClientSession): Promise<typeof SubjectWithBase> {

        try {
            const majorId = new mongoose.Types.ObjectId(subjectData.majorId);
            const subject: any = await SubjectWithBase.create([{
                _id: new mongoose.Types.ObjectId(subjectData.subjectId),
                majorId: majorId,
                subjectName: subjectData.subjectName,
                semester: subjectData.semester,
                // question: subjectData.question,
                // answer: subjectData.answer,
                imagePath: subjectData.imagePath,
                majorName: subjectData.majorName,
                subjectCode: subjectData.subjectCode
            }], { session })

            return subject[0];
        } catch (error: any) {
            throw new Error(
                "Error at createUser in SubjectRepository: " + error.message
            );
        }

    }

    async CreateSubjectModel(subjectData: any): Promise<typeof SubjectWithBase> {

        try {
            const majorId = new mongoose.Types.ObjectId(subjectData.majorId);
            const subject: any = await SubjectModelWithBase(subjectData.subjectName).create([{
                majorId: majorId,
                subjectName: subjectData.subjectName,
                semester: subjectData.semester,
                imagePath: subjectData.imagePath,
                question: subjectData.question,
                questionId: subjectData.questionId,
                answer: subjectData.answer,
                answerId: subjectData.answerId,
                majorName: subjectData.majorName,
                subjectCode: subjectData.subjectCode
            }])
            return subject[0];
        } catch (error: any) {
            throw new Error(
                "Error at createUser in SubjectRepository: " + error.message
            );
        }

    }

    async GetSubjectById(subjectData: any): Promise<typeof SubjectWithBase> {
        try {
            const query: any = {
                _id: new mongoose.Types.ObjectId(subjectData.subjectId),
                isDelete: subjectData.isDelete,
                isActive: subjectData.isActive,
            }
            const subject: typeof SubjectWithBase[] = await SubjectWithBase.find(query);
            return subject[0];
        } catch (error: any) {
            throw new Error("Error at getUserById in SubjectRepository: " + error.meesage)
        }
    }

    async GetSubjectBySubjectCode(collectionName: string, query: any): Promise<typeof SubjectModelWithBase> {
        try {
            const subject: typeof SubjectModelWithBase[] = await SubjectModelWithBase(collectionName).find(query);
            return subject[0];
        } catch (error: any) {
            throw new Error("Error at getUserById in SubjectRepository: " + error.meesage)
        }
    }

    async GetRootSubjectCollectionBySubjectCode(query: any): Promise<typeof SubjectWithBase> {
        try {
            const subject: any = await SubjectWithBase.findOne(query);
            return subject;
        } catch (error: any) {
            throw new Error("Error at getUserById in SubjectRepository: " + error.meesage)
        }
    }

    async UpdateSubjectById(subjectId: any, subjectData: any, session: ClientSession): Promise<typeof SubjectWithBase> {
        try {
            const _id = new mongoose.Types.ObjectId(subjectId);
            const subject: any = await SubjectWithBase.findByIdAndUpdate(_id, {
                majorId: new mongoose.Types.ObjectId(subjectData.majorId),
                subjectName: subjectData.subjectName,
                semester: subjectData.semester,
                imagePath: subjectData.imagePath,
                majorName: subjectData.majorName,
                subjectCode: subjectData.subjectCode
            }, { session })
            return subject;
        } catch (error: any) {
            throw new Error("Error at getUserById in SubjectRepository: " + error.meesage)
        }




    }


    async DeleteSubjectById(queryData: any, session: ClientSession): Promise<typeof SubjectWithBase> {
        try {
            const _id = new mongoose.Types.ObjectId(queryData.subjectId);
            const subject: any = await SubjectWithBase.findByIdAndUpdate(_id, {
                isActive: queryData.isActive,
                isDelete: queryData.isDelete
            }, { session })
            return subject;
        } catch (error: any) {
            throw new Error("Error at getUserById in SubjectRepository: " + error.meesage)

        }
    }
}
export default SubjectRepository;
