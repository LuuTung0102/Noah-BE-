import { Request, Response } from "express";
import { CreateSubjectRequest } from "../../Application/Features/Subject/Request/CreateSubjectRequest";
import { CreateSubjectHandler } from "../../Application/Features/Subject/Handlers/CreateSubjectHandler";
import { CoreException } from "../../Application/Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../Domain/Enums/StatusCodeEnums";
import { GetSubjectById } from "../../Application/Features/Subject/Request/GetSubjectByIdRequest";
import { GetSubjectByIdHandler } from "../../Application/Features/Subject/Handlers/GetSubjectByIdHandler";
import { UpdateSubjectByIdRequest } from "../../Application/Features/Subject/Request/UpdateSubjectRequestById";
import { UpdateSubjectByIdHandler } from "../../Application/Features/Subject/Handlers/UpdateSubjectByIdHandler";
import { DeleteSubjectByIdRequest } from "../../Application/Features/Subject/Request/DeleteSubjectByIdRequest";
import SubjectRepository from "../../Infrastructure/Persistences/Respositories/SubjectRepository";
import { DeleteSubjectByIdHandler } from "../../Application/Features/Subject/Handlers/DeleteSubjectByIdHandler";
import { DownloadSubjectRequest } from "../../Application/Features/Subject/Request/DownloadSubjectRequest";
import { DownloadSubjectHandler } from "../../Application/Features/Subject/Handlers/DownloadSubjectHandler";
import { CreateLogHandler } from "../../Application/Features/Log/Handler/CreateLogHandler";
import { GetAllSubjectsHandler } from "../../Application/Features/Subject/Handlers/GetAllSubjectsHandler";

export default class SubjectController {
    async createSubject(req: Request, res: Response) {
        // #swagger.description = 'Create subject by major'
        // #swagger.tags = ["Subjects"]
        /*
        #swagger.consumes = ['multipart/form-data']  
        #swagger.parameters['file'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
        },
         #swagger.parameters['majorId'] = {
    in: 'formData',
    type: 'string',
    required: 'true',
    description: 'Major id '
},
 #swagger.parameters['subjectName'] = {
    in: 'formData',
    type: 'string',
    required: 'true',
    description: 'Subject Name'
},
 #swagger.parameters['semester'] = {
    in: 'formData',
    type: 'number',
    required: 'true',
    description: 'Semester '
},
 #swagger.parameters['imagePath'] = {
    in: 'formData',
    type: 'string',
    description: 'Image Path '
}
    */

        try {
            const file: any = req.file;
            const filePath = file.path
            const { majorId, subjectName, semester, imagePath } = req.body;
            const data = {
                majorId: majorId,
                subjectName: subjectName,
                semester: semester,
                imagePath: imagePath
            };
            const result: any = await CreateSubjectHandler(data, filePath);
            return res.status(result.statusCode).json({ data: result })
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json(error.message);
        }
    }

    async getSubjectById(req: Request<any, any, GetSubjectById>, res: Response) {
        // #swagger.description = 'Get subject by Subject ID'
        // #swagger.tags = ["Subjects"]
        try {
            // const _id = req.params.subjectId
            const { subjectId } = req.params
            const data = {
                subjectId: subjectId,
            }
            const result: any = await GetSubjectByIdHandler(data);
            return res.status(result.statusCode).json({ data: result })
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json(error.message);
        }
    }

    async updateSubjectById(req: Request<any, any, UpdateSubjectByIdRequest>, res: Response) {
        // #swagger.description = 'Update subject by Id'
        // #swagger.tags = ["Subjects"]
        try {
            const { subjectId } = req.params
            const { majorId, subjectName, semester, imagePath } = req.body;
            const data = {
                majorId: majorId,
                subjectName: subjectName,
                semester: semester,
                imagePath: imagePath
            };
            const result: any = await UpdateSubjectByIdHandler(subjectId, data);
            return res.status(result.statusCode).json({ data: result })
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json(error.message);

        }
    }

    async deleteSubjectById(req: Request<any, any, DeleteSubjectByIdRequest>, res: Response) {
        // #swagger.description = 'Delete subject by id by update field isDelete'
        // #swagger.tags = ["Subjects"]
        try {
            const { subjectId } = req.params;
            const result: any = await DeleteSubjectByIdHandler(subjectId);
            return res.status(result.statusCode).json({ data: result })
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json(error.message);

        }
    }


    async downloadSubject(req: Request<any, any, DownloadSubjectRequest>, res: Response) {
        // #swagger.description = 'Download subject by Subject Code'
        // #swagger.tags = ["Subjects"]
        try {

            // const _id = req.params.subjectId
            const { subjectId } = req.params;
            const data = {
                subjectId: subjectId,
            }
            const userId = (req as any).user.userId;
            // const dataLog: any = {
            //     userId: userId,
            //     subjectId: subjectId
            // }
            // const schoolId = (req as any).user.schoolId;
            const result: any = await DownloadSubjectHandler(data, res);
            // if (result.statusCode == 200) {
            //     await CreateLogHandler(dataLog)
            // }
            return res.status(result.statusCode).json({ data: result })
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json(error.message);
        }
    }


    async getAllSubjects(req: Request, res: Response) {
        // #swagger.description = 'Get all subjects '
        // #swagger.tags = ["Subjects"]

        try {


            const result: any = await GetAllSubjectsHandler();
            return res.status(result.statusCode).json({ data: result })
        } catch (error: any) {
            return res.status(StatusCodeEnums.InternalServerError_500).json(error.message);
        }
    }
}