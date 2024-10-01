import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { updateAnswerByIdResponse } from "../Response/UpdateAnswerByIdResponse";


export async function updateAnswerByIdHandler(data: any): Promise<updateAnswerByIdResponse | CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const session = await unitOfWork.startTransaction();
        const answerId = data.answerId;
        const queryForCheck = {
            answerId: answerId,
            isDelete: false,
            isActive: true,
        }
        const checkAnswerId = await unitOfWork.answerRepository.getAnswerById(queryForCheck);
        if (checkAnswerId == null || !checkAnswerId) {
            return new CoreException(StatusCodeEnums.BadRequest_400, "Can not find this answer ID");
        }
        const dataUpdate = {
            answer: data.answer,
            questionId: data.questionId,
        }
        const result: any = await unitOfWork.answerRepository.updateAnswerById(answerId, dataUpdate, session);
        await unitOfWork.commitTransaction();
        const queryForFilter = {
            questionId: data.questionId,
            isDelete: false,
            isActive: true
        }
        const session1 = await unitOfWork.startTransaction();
        const answerForUpdate: any = await unitOfWork.answerRepository.filterAnswersByQuestionId(queryForFilter);
        const updateQuestionData = answerForUpdate.map((item: { _id: string, questionId: string, answer: string }) =>
        (
            {
                answerId: item._id,
                questionId: item.questionId,
                answer: item.answer,
            }
        ));
        const updateQuestionIdData = answerForUpdate.map((item: { _id: string }) =>
        (
            {
                answerId: item._id
            }
        ));
        const dataUpdateQuestion = {
            updateQuestionData,
            updateQuestionIdData
        }
        await unitOfWork.questionRepository.updateQuestionAnswerById(data.questionId, dataUpdateQuestion, session1);

        await unitOfWork.commitTransaction();
        return new updateAnswerByIdResponse("Successful", StatusCodeEnums.OK_200, result);
    } catch (error: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
    }
}