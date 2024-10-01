import mongoose, { ClientSession } from "mongoose";
import { CoreException } from "../../../Application/Common/Exceptions/CoreException";
import IAnswerRepository from "../../../Application/Persistences/IRepositories/IAnswerRepository";
import { AnswerModelWithBase, AnswerWithBase } from "../../../Domain/Entities/AnswerEntities";
import { StatusCodeEnums } from "../../../Domain/Enums/StatusCodeEnums";

class AnswerRepository implements IAnswerRepository {
    async getAnswerByAnswerCode(queryData: any): Promise<typeof AnswerWithBase | CoreException> {
        try {
            const query = {
                answerCode: queryData.answerCode,
                isDelete: queryData.isDelete,
                isActive: queryData.isActive
            }
            const answer: typeof AnswerWithBase[] = await AnswerWithBase.find(query);
            return answer[0];
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async GetRootAnswersCollectionByQuestionCode(query: any): Promise<typeof AnswerWithBase | CoreException> {
        try {
            const answers: any = await AnswerWithBase.findOne(query);
            return answers;
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }
    async filterAnswersByQuestionId(queryData: any): Promise<typeof AnswerWithBase[] | CoreException> {
        try {
            const query = {
                questionId: queryData.questionId,
                isDelete: queryData.isDelete,
                isActive: queryData.isActive,
            }
            const answers: typeof AnswerWithBase[] = await AnswerWithBase.find(query);
            return answers;
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }
    async GetAnswersInCollection(query: any, collectionName: string): Promise<typeof AnswerModelWithBase[] | CoreException> {
        try {
            const answers: typeof AnswerModelWithBase[] = await AnswerModelWithBase(collectionName).find(query);
            return answers;
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }
    async getAnswerById(queryData: any): Promise<typeof AnswerWithBase | CoreException> {
        try {
            const query = {
                _id: queryData.answerId,
                isDelete: queryData.isDelete,
                isActive: queryData.isActive,
            }
            const answer: typeof AnswerWithBase[] = await AnswerWithBase.find(query);
            return answer[0];
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }
    async createAnswer(createAnswerData: any, session: ClientSession): Promise<typeof AnswerWithBase | CoreException> {
        try {
            const answer: any = await AnswerWithBase.create([{
                answerName: createAnswerData.answerName,
                answerCode: createAnswerData.answerCode,
                questionName: createAnswerData.questionName,
                questionCode: createAnswerData.questionCode,
                answer: createAnswerData.answer,
                questionId: createAnswerData.questionId
            }], { session });
            return answer[0];
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }
    async updateAnswerById(answerId: string, answerData: any, session: ClientSession) {
        try {
            const _id = new mongoose.Types.ObjectId(answerId);
            const answer: any = await AnswerWithBase.findByIdAndUpdate(_id, {
                answer: answerData.answer,
                questionId: answerData.questionId
            }, { session });
            return answer;
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }
    async deleteAnswerById(queryData: any, session: ClientSession) {
        try {
            const query: any = {
                _id: queryData.answerId,
                isDelete: queryData.isDelete,
                isActive: queryData.isActive,
            }
            await AnswerWithBase.deleteOne(query);
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }

    async createAnswerCollection(answerData: any, session: ClientSession) {
        try {
            const questionCollection: any = await AnswerModelWithBase(answerData.answerName).create([{
                _id: new mongoose.Types.ObjectId(answerData.answerId),
                answerName: answerData.answerName,
                answerCode: answerData.answerCode,
                answer: answerData.answer,
                questionId: new mongoose.Types.ObjectId(answerData.questionId)
            }], { session });
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }
}

export default AnswerRepository;