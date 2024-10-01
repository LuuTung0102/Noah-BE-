import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { deleteAnswerByIdResponse } from "../Response/DeleteAnswerByIdResponse";


export async function deleteAnswerByIdHandler(data: any): Promise<deleteAnswerByIdResponse | CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const session = await unitOfWork.startTransaction();
        const query = {
            answerId: data.answerId,
            isDelete: false,
            isActive: true
        }
        const checkAnswerId: any = await unitOfWork.answerRepository.getAnswerById(query);
        console.log(checkAnswerId.questionId);
        if (checkAnswerId == null || !checkAnswerId) {
            return new CoreException(StatusCodeEnums.BadRequest_400, "Can not find this question ID");
        }

        const result: any = await unitOfWork.answerRepository.deleteAnswerById(query, session);
        await unitOfWork.commitTransaction();

        const queryForFilter = {
            questionId: checkAnswerId.questionId,
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
        console.log(checkAnswerId.questionId);
        await unitOfWork.questionRepository.updateQuestionAnswerById(checkAnswerId.questionId, dataUpdateQuestion, session1);
        await unitOfWork.commitTransaction();
        return new deleteAnswerByIdResponse("Successful", StatusCodeEnums.OK_200, {});
    } catch (error: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge)
    }
}