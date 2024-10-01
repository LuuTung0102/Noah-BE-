
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { GetAllSchoolResponse } from "../Response/GetAllSchoolResponse";
import { ISchool } from "../../../Persistences/IRepositories/ISchoolRepository";

export async function GetAllSchoolHandler(): Promise<GetAllSchoolResponse|CoreException> {
    try {
      const unitOfWork: IUnitOfWork = new UnitOfWork();
      await unitOfWork.startTransaction();
     
      const schools: any = await unitOfWork.schoolRepository.getAllSchools();
      console.log('check schools', schools);

      // const responseSchool = {
      //   schoolName: schools.schoolName,  subject: schools.subject,  marjor: schools.marjor, imagePath:schools.imagePath
      // }

     
      if (!schools) {
        return new CoreException(StatusCodeEnums.InternalServerError_500, "Schools not found!");
      }
      // return res.status(200).json({schools})
      return new GetAllSchoolResponse("Get all school successful", StatusCodeEnums.OK_200, schools);
    } catch (error: any) {
        return new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
    }
}