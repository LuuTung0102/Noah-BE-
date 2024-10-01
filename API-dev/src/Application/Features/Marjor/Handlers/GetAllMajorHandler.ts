
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { GetAllMajorResponse } from "../Reponse/GetAllMajorResponse";

export async function GetAllMajor(): Promise<GetAllMajorResponse|CoreException> {
    try {
      const unitOfWork: IUnitOfWork = new UnitOfWork();
      await unitOfWork.startTransaction();
     
      const majors: any = await unitOfWork.majorRepository.getAllMajor();
      console.log('check schools', majors);

      // const responseSchool = {
      //   schoolName: schools.schoolName,  subject: schools.subject,  marjor: schools.marjor, imagePath:schools.imagePath
      // }

     
      if (!majors) {
        return new CoreException(StatusCodeEnums.InternalServerError_500, "Schools not found!");
      }
      // return res.status(200).json({schools})
      return new GetAllMajorResponse("Get all major successful", StatusCodeEnums.OK_200, majors);
    } catch (error: any) {
        return new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
    }
}