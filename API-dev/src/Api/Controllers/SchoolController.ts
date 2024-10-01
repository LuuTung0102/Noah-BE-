import express, { Request, Response, Router } from 'express';
import { SchoolRepository } from '../../Infrastructure/Persistences/Respositories/SchoolRepository';
import  ISchoolRepository  from '../../Application/Persistences/IRepositories/ISchoolRepository';
import { CreateSchoolHandler } from '../../Application/Features/School/Handlers/CreateSchoolHandler';
import { GetAllSchoolHandler } from '../../Application/Features/School/Handlers/GetAllSchoolHandler';
import { GetSchoolHandler } from '../../Application/Features/School/Handlers/GetSchoolHandler';
import { DeleteSchoolHandler } from '../../Application/Features/School/Handlers/DeleteSchoolHandler';
import { UpdateSchoolHandler } from '../../Application/Features/School/Handlers/UpdateSchoolHandler';
import { DeleteMajorSoftHandler } from '../../Application/Features/Marjor/Handlers/DeleteMajorSoftHandler';
import { CreateSchoolRequest } from '../../Application/Features/School/Requests/CreateSchoolRequest';
import { UpdateSchoolRequest } from '../../Application/Features/School/Requests/UpdateSchoolRequest';


export default class SchoolController {
  private router: Router;
  private schoolRepository: ISchoolRepository;


  constructor() {
    this.router = express.Router();
    this.schoolRepository = new SchoolRepository();
  }

  async createSchool(req: Request<any,any,CreateSchoolRequest>, res: Response) {
    // #swagger.description = 'Create new school'
    // #swagger.tags = ["Schools"]

    try {
      const {schoolName, majorId, imagePath} = req.body;

      const data: any = {
        schoolName,
        majorId,
        imagePath
      }
      const newSchool = await CreateSchoolHandler(data);
      console.log("newSchool", newSchool);
      res.status(201).json(newSchool);
    } catch (error) {
      console.error("Error creating school:", error);
      res.status(500).json({ error: 'Failed to create school' });
    }
  }

  async getAllSchools(req: Request, res: Response) {
    // #swagger.description = 'Get all school'
    // #swagger.tags = ["Schools"]
    try {
      const schools = await GetAllSchoolHandler();
      return res.status(200).json(schools);
    } catch (error) {
      console.error("Error fetching schools:", error);
      res.status(500).json({ error: 'Failed to fetch schools' });
    }
  }

  async getSchoolById(req: Request, res: Response) {
    // #swagger.description = 'Get school by ID'
    // #swagger.tags = ["Schools"]
    const schoolId = req.params.schoolId;
    try {
      const school = await GetSchoolHandler(schoolId);
      if (!school) {
        return res.status(404).json({ error: 'School not found' });
      }
      res.status(200).json(school);
    } catch (error) {
      console.error("Error fetching school:", error);
      res.status(500).json({ error: 'Failed to fetch school' });
    }
  }

  async updateSchoolById(req: Request<any, any, UpdateSchoolRequest>, res: Response) {
    // #swagger.description = 'Update school by ID'
    // #swagger.tags = ["Schools"]
    const schoolId = req.params.schoolId;
    const {schoolName, majorId, imagePath} = req.body;

    const data: any = {
      schoolName,
      majorId,
      imagePath
    }
    try {
      const updatedSchool = await UpdateSchoolHandler(schoolId, data);
      if (!updatedSchool) {
        return res.status(404).json({ error: 'School not found' });
      }
      res.status(200).json(updatedSchool);
    } catch (error) {
      console.error("Error updating school:", error);
      res.status(500).json({ error: 'Failed to update school' });
    }
  }

  async deleteSchoolById(req: Request, res: Response) {
    // #swagger.description = 'Remove school by ID'
    // #swagger.tags = ["Schools"]
    const schoolId = req.params.schoolId;
    try {
      await DeleteSchoolHandler(schoolId);
      res.status(200).json({message:"delete successfully"});
    } catch (error) {
      console.error("Error deleting school:", error);
      res.status(500).json({ error: 'Failed to delete school' });
    }
  }

}
