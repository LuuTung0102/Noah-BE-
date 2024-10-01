import mongoose, { Model, SchemaDefinitionProperty, SchemaType, Schema, DefaultSchemaOptions, Document, FlatRecord, SchemaTypeOptions, MixedSchemaTypeOptions, ClientSession, mongo } from "mongoose";
import IQuestionRepository from "../../../Application/Persistences/IRepositories/IQuestionRepository";
import { QuestionModelWithBase, QuestionWithBase } from "../../../Domain/Entities/QuestionEntities";
import { CoreException } from "../../../Application/Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../Domain/Enums/StatusCodeEnums";

class QuestionRepository implements IQuestionRepository {
    async filterBySubjectId(queryData: any): Promise<typeof QuestionWithBase | CoreException> {
        try {
            const query: any = {
                subjectId: new mongoose.Types.ObjectId(queryData.subjectId),
                isDelete: queryData.isDelete,
                isActive: queryData.isActive,
            }
            const questions: typeof QuestionWithBase[] = await QuestionWithBase.find(query);
            return questions[0];
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);

        }
    }

    async filterBySubjectIdCollection(queryData: any): Promise<typeof QuestionModelWithBase[] | CoreException> {
        try {
            const query: any = {
                subjectId: new mongoose.Types.ObjectId(queryData.subjectId),
                isDelete: queryData.isDelete,
                isActive: queryData.isActive,
            }
            const questions: typeof QuestionModelWithBase[] = await QuestionModelWithBase(queryData.collectionName).find(query);
            return questions;
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);

        }
    }

    async getQuestionById(queryData: any): Promise<typeof QuestionWithBase | CoreException> {
        try {
            const query: any = {
                _id: new mongoose.Types.ObjectId(queryData.questionId),
                isDelete: queryData.isDelete,
                isActive: queryData.isActive,
            }
            const question: typeof QuestionWithBase[] = await QuestionWithBase.find(query);
            console.log(question);
            return question[0];
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }

    async getQuestionInCollectionById(collectionName: string, query: any): Promise<typeof QuestionModelWithBase | CoreException> {
        try {
            const question: typeof QuestionModelWithBase[] = await QuestionModelWithBase(collectionName).find(query);
            console.log(question);
            return question[0];
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }

    async GetRootQuestionCollection(query: any): Promise<typeof QuestionWithBase | CoreException> {
        try {
            const rootCollection: any = await QuestionWithBase.findOne(query);
            return rootCollection;
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async createQuestion(questionData: any, session: ClientSession): Promise<typeof QuestionWithBase | CoreException> {
        try {
            const question: any = await QuestionWithBase.create([{
                questionName: questionData.questionName,
                questionCode: questionData.questionCode,
                questionTopic: questionData.questionTopic,
                questionDescription: questionData.questionDescription,
                subjectId: new mongoose.Types.ObjectId(questionData.subjectId),
                answerId: questionData.answerId,
                isImage: questionData.isImage,
                imagePath: questionData.imagePath,
            }], { session });
            return question[0];
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async createQuestionCollection(questionData: any, session: ClientSession) {
        try {
            const questionCollection: any = await QuestionModelWithBase(questionData.questionName).create([{
                _id: new mongoose.Types.ObjectId(questionData.questionId),
                questionName: questionData.questionName,
                questionCode: questionData.questionCode,
                questionTopic: questionData.questionTopic,
                questionDescription: questionData.questionDescription,
                subjectId: new mongoose.Types.ObjectId(questionData.subjectId),
                answerId: questionData.answerId,
                answer: {
                    answerId: questionData.answerId.length >1 ?questionData.answerId : [questionData.answerId],
                    questionId: questionData.questionId,
                    answer: questionData.answer
                },
                isImage: questionData.isImage,
                imagePath: questionData.imagePath,
            }], { session });
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }

    async updateQuestionById(questionId: string, questionData: any, session: ClientSession) {
        try {
            const _id = new mongoose.Types.ObjectId(questionId);
            const question: any = await QuestionWithBase.findByIdAndUpdate(_id, {
                questionTopic: questionData.questionTopic,
                questionDescription: questionData.questionDescription,
                subjectId: questionData.subjectId,
                $push: {
                    answerId: questionData.answerId,
                    answer: {
                        answerId: questionData.answerId,
                        questionId: questionData.answer.questionId,
                        answer: questionData.answer.answer
                    }
                },
                isImage: questionData.isImage,
                imagePath: questionData.imagePath
            }, { session });
            return question;
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
        }
    }

    async updateQuestionAnswerById(questionId: string, answerForUpdate: any, session: ClientSession) {
        try {
            const _id = new mongoose.Types.ObjectId(questionId);
            const question: any = await QuestionWithBase.findByIdAndUpdate(_id, {
                $set: {
                    answerId: answerForUpdate.updateQuestionIdData,
                    answer: answerForUpdate.updateQuestionData
                }
            }, { session })
            return question;
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);

        }
    }

    async deleteQuestionById(queryData: any, session: ClientSession) {
        try {
            const query: any = {
                _id: queryData.questionId,
                isDelete: queryData.isDelete,
                isActive: queryData.isActive,
            }
            await QuestionWithBase.deleteOne(query);
        } catch (error: any) {
            throw new Error("Error at deleteQuestionById in QuestionRepository: " + error.message);
        }
    }

    async getQuestionByQuestionCode(queryData: any): Promise<typeof QuestionWithBase | CoreException> {
        try {
            const query: any = {
                questionCode: queryData.questionCode,
                isDelete: queryData.isDelete,
                isActive: queryData.isActive
            }
            const question: typeof QuestionWithBase[] = await QuestionWithBase.find(query);
            console.log(question);
            return question[0];
        } catch (error: any) {
            throw new Error("Error at getQuestionByQuestionCode in QuestionRepository: " + error.message);
        }
    }
}


export default QuestionRepository;