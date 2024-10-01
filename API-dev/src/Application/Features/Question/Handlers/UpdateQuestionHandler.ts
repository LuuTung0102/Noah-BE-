import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { updateQuestionByIdResponse } from "../Response/UpdateQuestionByIdResponse";

export async function updateQuestionByIdHandler(data: any): Promise<updateQuestionByIdResponse|CoreException>  {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const session = await unitOfWork.startTransaction();
        const questionId = data.questionId;
        const queryForCheck = {
            questionId: questionId,
            isDelete: false,
            isActive: true,
        }
        const checkQuestionId = await unitOfWork.questionRepository.getQuestionById(queryForCheck);
        if (checkQuestionId == null || !checkQuestionId) {
            return new CoreException(StatusCodeEnums.BadRequest_400, "Can not find this question ID");
        }
        const dataUpdate = {
            questionTopic: data.questionTopic,
            questionDescription: data.questionDescription,
            subjectId: data.subjectId,
            answerId: data.answerId,
            isImage: data.isImage,
            imagePath: data.imagePath
        }
        const result: any = await unitOfWork.questionRepository.updateQuestionById(questionId, dataUpdate, session);
        await unitOfWork.commitTransaction();
        return new updateQuestionByIdResponse("Successful", StatusCodeEnums.OK_200, result);
    } catch (error: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
    }
}