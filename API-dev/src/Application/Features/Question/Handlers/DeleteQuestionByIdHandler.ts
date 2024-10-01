import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { deleteQuestionByIdResponse } from "../Response/DeleteQuestionByIdResponse";

export async function deleteQuestionByIdHandler(data: any): Promise<deleteQuestionByIdResponse|CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const session = await unitOfWork.startTransaction();
        const query = {
            questionId: data.questionId,
            isDelete: false,
            isActive: true
        }
        const result: any = await unitOfWork.questionRepository.deleteQuestionById(query, session);
        await unitOfWork.commitTransaction();
        return new deleteQuestionByIdResponse("Successful" ,StatusCodeEnums.OK_200, {});
    } catch (error: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge)
    }
}