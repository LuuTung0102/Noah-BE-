import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { GetAllSubjectsResponse } from "../Response/GetAllSubjectResponse";
import { GetSubjectByIdResponse } from "../Response/GetSubjectByIdResponse";

export async  function GetAllSubjectsHandler(): Promise<GetAllSubjectsResponse | CoreException>{
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const queryData: any = {
            isDelete: false,
            isActive: true
        }
        const subject: any = await unitOfWork.subjectRepository.GetAllSubjects(queryData);
        const subjectResponseData = {
            subjectId : subject._id,
            subjectName: subject.subjectName,
            semester: subject.semester,
            imagePath: subject.imagePath,
            majorName: subject.majorName
        }
        return new GetAllSubjectsResponse("Succesfully", StatusCodeEnums.OK_200, subject)
    } catch (error: any) {
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
    }

}