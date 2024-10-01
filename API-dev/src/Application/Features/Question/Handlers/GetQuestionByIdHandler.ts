import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { getQuestionByIdResponse } from "../Response/GetQuestionByIdResponse";

export async function getQuestionByIdHandler(data: any): Promise<getQuestionByIdResponse|CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        await unitOfWork.startTransaction();
        const query = {
            questionId: data.questionId,
            isDelete: false,
            isActive: true,
        }
        const result: any = await unitOfWork.questionRepository.getQuestionById(query);
        if (result == null) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, "Can not find this question by Id");
        }
        console.log(result);
        return new getQuestionByIdResponse("successful", StatusCodeEnums.OK_200, result);

    } catch (error: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
    }
}