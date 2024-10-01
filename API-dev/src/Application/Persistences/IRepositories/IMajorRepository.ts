import { ClientSession } from 'mongoose';
import { MajorWithBase } from './../../../Domain/Entities/MajorEntities';


export default interface IMajorRepository {
  createMajor(majorData: any, session : ClientSession) : Promise<typeof MajorWithBase  | null>;
  getAllMajor(): Promise<any>;
  updateMajorById(majorId: string, update: any, session: ClientSession): Promise<any | null>;
  getMajorById(majorId: string): Promise<any>;
  deleteMajorById(majorId: string, session: ClientSession): Promise<void>;
  softDeleteSubjectById(majorId: string, session: ClientSession): Promise<void>
}