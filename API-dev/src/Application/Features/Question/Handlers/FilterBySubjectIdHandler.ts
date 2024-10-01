import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { filterBySubjectIdResponse } from "../Response/FilterBySubjectIdResponse";
 

export async function filterBySubjectIdHandler(data: any): Promise<filterBySubjectIdResponse|CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        await unitOfWork.startTransaction();
        const subjectQueryData: any = {
            subjectId: data.subjectId,
            isDelete: false,
            isActive: true,
        }
        const question: any = await unitOfWork.questionRepository.filterBySubjectId(subjectQueryData);
        const query = {
            collectionName: question.questionName,            
            subjectId: data.subjectId,
            isDelete: false,
            isActive: true,
        }
        const result: any = await unitOfWork.questionRepository.filterBySubjectIdCollection(query);
        if (result == null) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, "Can not find this question by Id");
        }
        return new filterBySubjectIdResponse("successful", StatusCodeEnums.OK_200, result);

    } catch (error: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
    }
}