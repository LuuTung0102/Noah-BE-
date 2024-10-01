import { ClientSession } from "mongoose";
import ISchoolRepository, { ISchool } from "../../../Application/Persistences/IRepositories/ISchoolRepository";


import { SchoolWithBase } from "../../../Domain/Entities/SchoolEntities";

class SchoolRepository implements ISchoolRepository {
    async createSchool(schoolData: Partial<ISchool>, session: ClientSession): Promise<ISchool> {
        try {
            const schoolwithBase: any = await SchoolWithBase.create([schoolData], { session });
            return schoolwithBase;
        } catch (error) {
            throw error;
        }
    }

    async getAllSchools(): Promise<ISchool[]> {
        try {
            const schools = await SchoolWithBase.find({});
            return schools;
        } catch (error) {
            throw error;
        }
    }

    async getSchoolById(schoolId: string): Promise<ISchool | null> {
        try {
            const school = await SchoolWithBase.findById(schoolId);
            return school;
        } catch (error) {
            throw error;
        }
    }

    async updateSchoolById(schoolId: string, update: Partial<ISchool>, session: ClientSession): Promise<ISchool | null> {
        try {
            const updatedSchool = await SchoolWithBase.findByIdAndUpdate(schoolId, update, { session });
            return updatedSchool;
        } catch (error) {
            throw error;
        }
    }

    async deleteSchoolById(schoolId: string, session: ClientSession): Promise<void> {
        try {
            await SchoolWithBase.findByIdAndDelete(schoolId, { session });
        } catch (error) {
            throw error;
        }
    }
}

export { SchoolRepository }