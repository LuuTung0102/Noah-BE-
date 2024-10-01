import * as fs from 'fs';
import { parseGiftFile } from '../../../Common/Helpers/fileUtils';
import { importGiftFileResponse } from '../Response/ImportGiftFileResponse';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { md5Encrypt } from '../../../Common/Helpers/passwordUtils';
import mongoose from 'mongoose';
import { QuestionModelWithBase } from '../../../../Domain/Entities/QuestionEntities';

export async function importGiftFileHandler(data:any): Promise<importGiftFileResponse | CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    const { file, subjectId} = data
    try {
        const questionA:any=[];
        const answerA:any=[];
        const questionIdA:any=[];
        const answerIdA:any=[];

        const session = await unitOfWork.startTransaction();
        // Doc file 

        const fileContent: string = fs.readFileSync(file, 'utf8');

        // Ham lay du lieu tu file 
        const dataFromFile: any = await parseGiftFile(fileContent);
        let questionExistStatus = 0;
        let answerExistStatus = 0;

        const prefixQuestion = "questions_";
        const prefixAnswer = "answers_";
        // Xu ly database
        for (const item of dataFromFile) {
            const questionName = prefixQuestion + item.name;
            const questionCode = await md5Encrypt(questionName);
            const queryCheckQuestion = {
                questionCode: questionCode,
                isDelete: false,
                isActive: true
            }
            const checkExistQuestion = await unitOfWork.questionRepository.getQuestionByQuestionCode(queryCheckQuestion);
            if (!checkExistQuestion || checkExistQuestion == null || checkExistQuestion == undefined) {
                //create questions_MON o collection(questions)
                const questionData = {
                    questionName: questionName,
                    questionCode: questionCode,
                    questionTopic: "",
                    questionDescription: "",
                    subjectId: subjectId,
                    answerId: [],
                    answer: [],
                    isImage: false,
                    imagePath: ""
                }
                await unitOfWork.questionRepository.createQuestion(questionData, session);
                await unitOfWork.commitTransactionWithoutEndSession();
                // questionExistStatus = 1;
            }
            const answerName = prefixAnswer + item.name;
            const answerCode = await md5Encrypt(answerName);
            const queryCheckAnswer = {
                answerCode: answerCode,
                isDelete: false,
                isActive: true
            }
            const checkExistAnswer = await unitOfWork.answerRepository.getAnswerByAnswerCode(queryCheckAnswer);
            //create answers_MON o collection(answers)
            if (!checkExistAnswer || checkExistAnswer == null || checkExistAnswer == undefined) {
                const answerData = {
                    answerName: answerName,
                    answerCode: answerCode,
                    questionName: questionName,
                    questionCode: questionCode,
                    answer: "",
                    questionId: null
                }
                await unitOfWork.answerRepository.createAnswer(answerData, session);
                await unitOfWork.commitTransactionWithoutEndSession();
                // answerExistStatus = 1
            }
            //create collection questions_MON
            const questionId: any = new mongoose.Types.ObjectId().toString();
            questionIdA.push(questionId)
            if (item.answer.length > 1) {
                const arrayAnswer: any = [];
                for (const itemAnswer of item.answer) {
                    const answerId: any = new mongoose.Types.ObjectId();
                    arrayAnswer.push(answerId.toString());
                    answerIdA.push(answerId)
                    const answerDataForCollection = {
                        answerId: answerId,
                        answerName: answerName,
                        answerCode: answerCode,
                        questionName: questionName,
                        questionCode: questionCode,
                        answer: itemAnswer,
                        questionId: questionId,
                    }
                    await unitOfWork.answerRepository.createAnswerCollection(answerDataForCollection, session);
                    await unitOfWork.commitTransactionWithoutEndSession();
                    answerA.push(answerDataForCollection)
                }
                const questionDataForCollection = {
                    questionId: questionId,
                    questionName: questionName,
                    questionCode: questionCode,
                    questionTopic: item.questionTopic,
                    questionDescription: item.questionDescription,
                    subjectId: subjectId,
                    answerId: arrayAnswer,
                    answer: item.answer,
                    isImage: false,
                    imagePath: ""
                }
                await unitOfWork.questionRepository.createQuestionCollection(questionDataForCollection, session);
                await unitOfWork.commitTransactionWithoutEndSession();
                questionA.push(questionDataForCollection)
            } else {
                const answerId = new mongoose.Types.ObjectId();
                answerIdA.push(answerId)

                const questionDataForCollection = {
                    questionId: questionId,
                    questionName: questionName,
                    questionCode: questionCode,
                    questionTopic: item.questionTopic,
                    questionDescription: item.questionDescription,
                    subjectId: subjectId,
                    answerId: answerId,
                    answer: item.answer,
                    isImage: false,
                    imagePath: ""
                }
                const answerDataForCollection = {
                    answerId: answerId,
                    answerName: answerName,
                    answerCode: answerCode,
                    questionName: questionName,
                    questionCode: questionCode,
                    answer: item.answer[0],
                    questionId: questionId,
                }
                answerA.push(answerDataForCollection)
                questionA.push(questionDataForCollection)
                await unitOfWork.questionRepository.createQuestionCollection(questionDataForCollection, session);
                await unitOfWork.answerRepository.createAnswerCollection(answerDataForCollection, session);
                await unitOfWork.commitTransactionWithoutEndSession();

            }

        }

        return new importGiftFileResponse("Successful", StatusCodeEnums.OK_200,questionA,answerA,questionIdA,answerIdA,"");
    } catch (error: any) {
        await unitOfWork.abortTransaction();
        console.error('Error importing file:', error);
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
    }
}