

import { CoreException } from "../../../Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { GetMajorByIdResponse } from "../Reponse/GetMajorByIdResonse";



export async function GetMajorByIdHandler(majorId: string): Promise<GetMajorByIdResponse|CoreException> {
    try {
      const unitOfWork: IUnitOfWork = new UnitOfWork();
      await unitOfWork.startTransaction();
     
      const major: any = await unitOfWork.majorRepository.getMajorById(majorId);
      console.log('check major', major);

      // const responseSchool = {
      //   schoolName: schools.schoolName,  subject: schools.subject,  marjor: schools.marjor, imagePath:schools.imagePath
      // }

     
      if (!major) {
        return new CoreException(StatusCodeEnums.InternalServerError_500, "Majors not found!");
      }
      // return res.status(200).json({schools})
      return new GetMajorByIdResponse("Get major by id successful", StatusCodeEnums.OK_200, major);
    } catch (error: any) {
        return new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
    }
}