import { CreateQuestionHandler } from "../../Application/Features/Question/Handlers/CreateQuestionHandler";
import { createQuestionRequest } from "../../Application/Features/Question/Request/CreateQuestionRequest";
import { Request, Response} from "express";
import { Answer } from "../../Domain/Entities/AnswerEntities";
import { getQuestionByIdHandler } from "../../Application/Features/Question/Handlers/GetQuestionByIdHandler";
import { getQuestionByIdRequest } from "../../Application/Features/Question/Request/GetQuestionByIdRequest";
import { filterBySubjectIdRequest } from "../../Application/Features/Question/Request/FilterBySubjectIdRequest";
import { updateQuestionByIdHandler } from "../../Application/Features/Question/Handlers/UpdateQuestionHandler";
import { updateQuestionByIdRequest } from "../../Application/Features/Question/Request/UpdateQuestionByIdRequest";
import { deleteQuestionByIdHandler } from "../../Application/Features/Question/Handlers/DeleteQuestionByIdHandler";
import { deleteQuestionByIdRequest } from "../../Application/Features/Question/Request/DeleteQuestionByIdRequest";
import { filterBySubjectIdHandler } from "../../Application/Features/Question/Handlers/FilterBySubjectIdHandler";


export default class QuestionController {

    async createQuestion(req: Request<any, any, createQuestionRequest>, res: Response): Promise<Response> {
        // #swagger.description = "Create new question"
        // #swagger.tags = ["Questions"]
        try {
            const {questionTopic, questionDescription, subjectId, answerId, isImage, imagePath} = req.body
            const data: any = {
                questionTopic: questionTopic,
                questionDescription: questionDescription,
                subjectId: subjectId,
                answerId: answerId,
                isImage: isImage,
                imagePath: imagePath,
            }
            const result: any = await CreateQuestionHandler(data);
            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({ error: result.error });
            }
            return res.status(result.statusCode).json(result);
        } catch (error: any) {
            return res.status(500).json({ error: error.messgae });
        }
    }

    async getQuestionById(req: Request<any, any, getQuestionByIdRequest>, res: Response): Promise<void> {
        // #swagger.description = "Get question by ID"
        // #swagger.tags = ["Questions"]
        try {
            const { questionId } = req.params;
            const data = {
                questionId: questionId
            }
            const result: any = await getQuestionByIdHandler(data);
           
            if (result.error != undefined || result.error) {
                res.status(result.statusCode).json({ error: result.error });
            }
            res.status(result.statusCode).json({ data: result });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async filterBySubjectId(req: Request<any, any, filterBySubjectIdRequest>, res: Response): Promise<void> {
        // #swagger.description = "Filter questions by Subject ID"
        // #swagger.tags = ["Questions"]
        try {
            const { subjectId } = req.params;
            const data = {
                subjectId: subjectId
            }
            const result: any = await filterBySubjectIdHandler(data);
            
            if (result.error != undefined || result.error) {
                res.status(result.statusCode).json({ error: result.error });
            }
            res.status(result.statusCode).json({ data: result });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateQuestionById(req: Request<any, any, updateQuestionByIdRequest>, res: Response): Promise<Response> {
        // #swagger.description = "Update question by ID"
        // #swagger.tags = ["Questions"]
        try {
            const {questionId ,questionTopic, questionDescription, subjectId, answerId, isImage, imagePath} = req.body
            const data: any = {
                questionId: questionId,
                questionTopic: questionTopic,
                questionDescription: questionDescription,
                subjectId: subjectId,
                answerId: answerId,
                isImage: isImage,
                imagePath: imagePath,
            }
            const result: any = await updateQuestionByIdHandler(data);
            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({ error: result.error });
            }
            return res.status(result.statusCode).json(result);
        } catch (error: any) {
            return res.status(500).json({ error: error.messgae });
        }
    }

    async deleteQuestionById(req: Request<any, any, deleteQuestionByIdRequest>, res: Response) {
        // #swagger.description = "Delete question by ID"
        // #swagger.tags = ["Questions"]
        try {
            const { questionId } = req.params;
            const data = {
                questionId: questionId
            }
            const result: any = await deleteQuestionByIdHandler(data);
            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({ error: result.error });
            }
            return res.status(result.statusCode).json(result);
        } catch (error: any) {
            return res.status(500).json({ error: error.messgae });
            
        }
    }
}