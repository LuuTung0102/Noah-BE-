import { Request, Response} from "express";
import { createAnswerRequest } from "../../Application/Features/Answer/Request/CreateAnswerRequest";
import { CreateAnswerHandler } from "../../Application/Features/Answer/Handler/CreateAnswerHandler";
import { filterAnswerByQuestionIdRequest } from "../../Application/Features/Answer/Request/FilterAnswerByQuestionIdRequest";
import { filterAnswerByQuestionIdHandler } from "../../Application/Features/Answer/Handler/FilterAnswerByQuestionIdHandler";
import { getAnswerByIdRequest } from "../../Application/Features/Answer/Request/GetAnswerByIdRequest";
import { getAnswerByIdHandler } from "../../Application/Features/Answer/Handler/GetAnswerByIdHandler";
import { updateAnswerByIdRequest } from "../../Application/Features/Answer/Request/UpdateAnswerByIdRequest";
import { updateAnswerByIdHandler } from "../../Application/Features/Answer/Handler/UpdateAnswerByIdHandler";
import { deleteAnswerByIdRequest } from "../../Application/Features/Answer/Request/DeleteAnswerByIdRequest";
import { deleteAnswerByIdHandler } from "../../Application/Features/Answer/Handler/DeleteAnswerByIdHandler";


export default class AnswerController {

    async createAnswer(req: Request<any, any, createAnswerRequest>, res: Response): Promise<Response> {
        // #swagger.description = "Create new answer"
        // #swagger.tags = ["Answers"]
        try {
            const { answer, questionId } = req.body
            const data: any = {
                answer: answer,
                questionId: questionId,
            }
            const result: any = await CreateAnswerHandler(data);
            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({ error: result.error });
            }
            return res.status(result.statusCode).json(result);
        } catch (error: any) {
            return res.status(500).json({ error: error.messgae });
        }
    }

    async filterAnswerByQuestionId(req: Request<any, any, filterAnswerByQuestionIdRequest>, res: Response): Promise<void> {
        // #swagger.description = "Filter answer by question ID"
        // #swagger.tags = ["Answers"]
        try {
            const { questionId } = req.params;
            const { questionCode } = req.query;
            const data = {
                questionId: questionId,
                questionCode: questionCode
            }
            const result: any = await filterAnswerByQuestionIdHandler(data);
            res.status(result.statusCode).json({ data: result });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAnswerById(req: Request<any, any, getAnswerByIdRequest>, res: Response): Promise<void> {
        // #swagger.description = "Get answer by ID"
        // #swagger.tags = ["Answers"]
        try {
            const { answerId } = req.params;
            const data = {
                answerId: answerId,
            }
            const result: any = await getAnswerByIdHandler(data);
            
            if (result.error != undefined || result.error) {
                res.status(result.statusCode).json({ error: result.error });
            }
            res.status(result.statusCode).json({ data: result });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateAnswerById(req: Request<any, any, updateAnswerByIdRequest>, res: Response): Promise<Response> {
        // #swagger.description = "Update answer by ID"
        // #swagger.tags = ["Answers"]
        try {
            const {answerId, answer , questionId} = req.body
            const data: any = {
                answerId: answerId,
                answer: answer,
                questionId: questionId,
            }
            const result: any = await updateAnswerByIdHandler(data);
            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({ error: result.error });
            }
            return res.status(result.statusCode).json(result);
        } catch (error: any) {
            return res.status(500).json({ error: error.messgae });
        }
    }

    async deleteAnswerById(req: Request<any, any, deleteAnswerByIdRequest>, res: Response) {
        // #swagger.description = "Delete answer by ID"
        // #swagger.tags = ["Answers"]
        try {
            const { answerId } = req.params;
            const data = {
                answerId: answerId
            }
            const result: any = await deleteAnswerByIdHandler(data);
            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({ error: result.error });
            }
            return res.status(result.statusCode).json(result);
        } catch (error: any) {
            return res.status(500).json({ error: error.messgae });
            
        }
    }
}