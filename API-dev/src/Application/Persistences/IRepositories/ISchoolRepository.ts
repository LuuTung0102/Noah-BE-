import { ClientSession, Document } from 'mongoose';

interface ISchool extends Document {
    schoolName?: string;
    subjectId?: string[];
    majorId?: string[];
    imagePath?: string;
    isDelete?: boolean;
    createTime?: Date;
    updateTime?: Date;
    isActive?: boolean;
}

export default interface ISchoolRepository {
    createSchool(schoolData: Partial<ISchool>, session: ClientSession): Promise<ISchool>;
    getAllSchools(): Promise<ISchool[]>;
    getSchoolById(schoolId: string): Promise<ISchool | null>;
    updateSchoolById(schoolId: string, update: Partial<ISchool>, session: ClientSession): Promise<ISchool | null>;
    deleteSchoolById(schoolId: string, session: ClientSession): Promise<void>;
}

export { ISchool };
