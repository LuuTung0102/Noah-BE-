import { CreateSchoolHandler } from '../../Application/Features/School/Handlers/CreateSchoolHandler';
import { CreateMajorRequest } from '../../Application/Features/Marjor/Requests/CreateMajorRequest';
import MajorRepository from '../../Infrastructure/Persistences/Respositories/MajorRepository';
import { Request, Response, Router } from "express";
import { CreateMajorHandler } from '../../Application/Features/Marjor/Handlers/CreateMajorHandler';
import { GetAllMajor } from '../../Application/Features/Marjor/Handlers/GetAllMajorHandler';
import { UpdateMajorHandler } from '../../Application/Features/Marjor/Handlers/UpdateMajorHandler';
import { DeleteSchoolHandler } from '../../Application/Features/School/Handlers/DeleteSchoolHandler';
import { DeleteMajorHandler } from '../../Application/Features/Marjor/Handlers/DeleteMajorHandler';
import { DeleteMajorSoftHandler } from '../../Application/Features/Marjor/Handlers/DeleteMajorSoftHandler';
import { GetMajorByIdResponse } from '../../Application/Features/Marjor/Reponse/GetMajorByIdResonse';
import { GetMajorByIdHandler } from '../../Application/Features/Marjor/Handlers/GetMajorByIdHandler';
import { UpdateSchoolRequest } from '../../Application/Features/School/Requests/UpdateSchoolRequest';
import { UpdateMajorRequest } from '../../Application/Features/Marjor/Requests/UpdateMajorRequest';

export default class MajorController {
  async createMajor(
    req: Request<any, any, CreateMajorRequest>,
    res: Response
  ): Promise<Response> {
     // #swagger.description = 'Create Major'
     // #swagger.tags = ["Major"]
    try {
      const { majorName , imagePath } = req.body;
      const data: any = {
        majorName,
        imagePath
      };
      const result: any = await CreateMajorHandler(data);
      if (result.error != undefined || result.error) {
        return res.status(result.statusCode).json({ error: result.error });
      }

      return res.status(result.statusCode).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.messgae });
    }
  }

  async getAllMajors(req: Request, res: Response) {
    // #swagger.description = 'Get all majors'
    // #swagger.tags = ["Major"]
    try {
      const majors = await GetAllMajor();
      return res.status(200).json(majors);
    } catch (error) {
      console.error("Error fetching schools:", error);
      res.status(500).json({ error: 'Failed to fetch schools' });
    }
  }


  async updateMajorById(req: Request<any, any, UpdateMajorRequest>, res: Response) {
    // #swagger.description = 'Update Major by ID'
    // #swagger.tags = ["Major"]
    const majorId = req.params.majorId;
    const {majorName, subjectId, imagePath } = req.body;
    const data = {majorName, subjectId, imagePath}
    try {
      const updatedMajor = await UpdateMajorHandler(majorId, data);
      if (!updatedMajor) {
        return res.status(404).json({ error: 'Major not found' });
      }
      res.status(200).json(updatedMajor);
    } catch (error) {
      console.error("Error updating school:", error);
      res.status(500).json({ error: 'Failed to update school' });
    }
  }

  async deleteMajorById(req: Request, res: Response) {
    // #swagger.description = 'Delete Major by Id'
    // #swagger.tags = ["Major"]
    const majorId = req.params.majorId;
    try {
      await DeleteMajorHandler(majorId);
      res.status(200).json({message:"Delete majorId successfully"});
    } catch (error) {
      console.error("Error deleting major:", error);
      res.status(500).json({ error: 'Failed to delete major' });
    }
  }

  
  async deleteMajorSoftById(req: Request, res: Response) {
    // #swagger.description = 'Disable Major by Id'
    // #swagger.tags = ["Major"]
    const majorId = req.params.majorId;
    try {
      await DeleteMajorSoftHandler(majorId);
      res.status(200).json({message:"delete soft successfully"});
    } catch (error) {
      console.error("Error deleting school:", error);
      res.status(500).json({ error: 'Failed to delete school' });
    }
  }
  
  async getMajorById(req: Request, res: Response) {
    // #swagger.description = 'Disable Major status by Id'
    // #swagger.tags = ["Major"]
    const majorId = req.params.majorId;
    try {
      const major = await GetMajorByIdHandler(majorId);
      if (!major) {
        return res.status(404).json({ error: 'MajorId not found' });
      }
      res.status(200).json(major);
    } catch (error) {
      console.error("Error fetching major:", error);
      res.status(500).json({ error: 'Failed to fetch major' });
    }
  } 

}