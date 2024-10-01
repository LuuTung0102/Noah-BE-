import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { CreateAnswerResponse } from "../Response/CreateAnswerResponse";


export async function CreateAnswerHandler(data: any): Promise<CreateAnswerResponse|CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const session = await unitOfWork.startTransaction();
        const queryForCheck = {
            questionId: data.questionId,
            isDelete: false,
            isActive: true,
        }
        const checkQuestionId: any = await unitOfWork.questionRepository.getQuestionById(queryForCheck);
        if (!checkQuestionId || checkQuestionId == null) {
           return new CoreException(StatusCodeEnums.BadRequest_400, "Can not find this question ID");
        }
        const createAnswerData: any = {
            answer: data.answer,
            questionId: data.questionId,
    };
        const result: any = await unitOfWork.answerRepository.createAnswer(createAnswerData, session);
        const queryForUpdate = {
            questionTopic: checkQuestionId.questionTopic,
            questionDescription: checkQuestionId.questionDescription,
            subjectId: checkQuestionId.subjectId, 
            answerId: result._id,
            answer: result,
            isImage: checkQuestionId.isImage,
            imagePath: checkQuestionId.imagePath
        }
        await unitOfWork.questionRepository.updateQuestionById(data.questionId, queryForUpdate, session);

        

        await unitOfWork.commitTransaction();
        return new CreateAnswerResponse("Successful", StatusCodeEnums.OK_200, result);
    } catch (error: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
    }
}