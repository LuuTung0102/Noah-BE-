import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { getAnswerByIdResponse } from "../Response/GetAnswerByIdResponse";


export async function getAnswerByIdHandler(data: any): Promise<getAnswerByIdResponse|CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        await unitOfWork.startTransaction();
        const query = {
            answerId: data.answerId,
            isDelete: false,
            isActive: true,
        }
        const result: any = await unitOfWork.answerRepository.getAnswerById(query);
        console.log(result.questionId);
        if (result == null) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, "Can not find this answer by Id");
        }
        console.log(result);
        return new getAnswerByIdResponse("successful", StatusCodeEnums.OK_200, result);

    } catch (error: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
    }
}