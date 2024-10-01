import { ClientSession } from "mongoose";
import { SubjectModelWithBase, SubjectWithBase } from "../../../Domain/Entities/SubjectEntities";

interface ISubjectRepository{
    CreateSubject(userData:any, session:ClientSession):Promise<typeof SubjectWithBase>
    GetSubjectById(userData:any):Promise<typeof SubjectWithBase>
    CreateSubjectModel(subjectData: any): Promise<typeof SubjectWithBase>
    GetSubjectBySubjectCode(collectionName: string, query: any): Promise<typeof SubjectModelWithBase>
    UpdateSubjectById(subjectId: any, subjectData: any, session: ClientSession): Promise<typeof SubjectWithBase>
    DeleteSubjectById(queryData: any, session: ClientSession): Promise<typeof SubjectWithBase>
    GetAllSubjects(queryData: any):Promise<typeof SubjectWithBase[]>
    GetRootSubjectCollectionBySubjectCode(query: any): Promise<typeof SubjectWithBase>
    
}

export default ISubjectRepository;