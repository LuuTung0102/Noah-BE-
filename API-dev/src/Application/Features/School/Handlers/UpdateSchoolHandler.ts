import { CreateUserResponse } from '../../User/Response/CreateUserResponse';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';
import { CreateSchoolResponse } from '../Response/UpdateSchoolResponse';



export async function UpdateSchoolHandler(schoolId:string, data: any): Promise<CreateUserResponse|CoreException> {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  try {
    const session = await unitOfWork.startTransaction();
    const {schoolName, subject, major, imagePath} = data;
    const roleQueryData: any = {
        isDelete: false,
        isActive: true,
    }
        
    const createSchoolData: any = {
      schoolName: schoolName,
      subject: subject,
      major: major,
      imagePath : imagePath
    };
    const result: any = await unitOfWork.schoolRepository.updateSchoolById(schoolId, createSchoolData, session);
    const school: any = await unitOfWork.schoolRepository.getSchoolById(schoolId);
    const responseUpdateSchoolData = { 
      schoolName: school.schoolName,
      subject: school.subject,
      major: school.major,
      imagePath : school.imagePath
    }
    await unitOfWork.commitTransaction();
  
    return new CreateSchoolResponse("Successful", StatusCodeEnums.OK_200, responseUpdateSchoolData);
  } catch (error: any) {
    await unitOfWork.abortTransaction();
    return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
  }
}
