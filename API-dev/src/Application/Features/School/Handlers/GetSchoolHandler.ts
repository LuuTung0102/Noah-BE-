

import { CoreException } from "../../../Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { GetAllSchoolResponse } from "../Response/GetAllSchoolResponse";
import { ISchool } from "../../../Persistences/IRepositories/ISchoolRepository";
import { GetSchoolResponse } from "../Response/GetSchoolResponse";

export async function GetSchoolHandler(schoolId: string): Promise<GetSchoolResponse|CoreException> {
    try {
      const unitOfWork: IUnitOfWork = new UnitOfWork();
      await unitOfWork.startTransaction();
     
      const school: any = await unitOfWork.schoolRepository.getSchoolById(schoolId);
      console.log('check schools', school);

      // const responseSchool = {
      //   schoolName: schools.schoolName,  subject: schools.subject,  marjor: schools.marjor, imagePath:schools.imagePath
      // }

     
      if (!school) {
        return new CoreException(StatusCodeEnums.InternalServerError_500, "Schools not found!");
      }
      // return res.status(200).json({schools})
      return new GetSchoolResponse("Get all school successful", StatusCodeEnums.OK_200, school);
    } catch (error: any) {
        return new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
    }
}