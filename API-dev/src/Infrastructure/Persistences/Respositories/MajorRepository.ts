import { ClientSession } from "mongoose";
import MajorController from "../../../Api/Controllers/MajorController";
import BaseRepository from "./BaseRepository";
import { MajorWithBase } from "../../../Domain/Entities/MajorEntities";
import IMajorRepository from "../../../Application/Persistences/IRepositories/IMajorRepository";


export default class MajorRepository implements IMajorRepository {
  async createMajor(majorData: any, session: ClientSession): Promise<typeof MajorWithBase> {
    try {
      const major: any = await MajorWithBase.create([majorData], { session });
      return major;
    } catch (error: any) {
      throw new Error("Error at createMajor in MajorRepository: " + error.message);
    }
  }

  async getAllMajor(): Promise<any> {
    try {
      const majors: any = await MajorWithBase.find({});
      return majors;
    } catch (error: any) {
      throw new Error("Error at get all Major in MajorRepository: " + error.message);
    }
  }

  async updateMajorById(majorId: string, update: any, session: ClientSession): Promise<any | null> {
    try {
      const updatedMajor = await MajorWithBase.findByIdAndUpdate(majorId, update, { session });
      return updatedMajor;
    } catch (error) {
      throw error;
    }
  }

  async getMajorById(majorId: string): Promise<any> {
    try {
        const majors = await MajorWithBase.findById(majorId);
        return majors;
    } catch (error) {
        throw error;
    }
}


  async deleteMajorById(majorId: string, session: ClientSession): Promise<void> {
    try {
      await MajorWithBase.findByIdAndDelete(majorId, { session });
    } catch (error) {
      throw error;
    }
  }

  async softDeleteSubjectById(majorId: string, session: ClientSession): Promise<void> {
    try {
      const subject = await MajorWithBase.findByIdAndUpdate(majorId, { isDelete: true }, { new: true });
      console.log('Soft deleted subject:', subject);
    } catch (error) {
      console.error('Error soft deleting subject:', error);
    }
  }



}

