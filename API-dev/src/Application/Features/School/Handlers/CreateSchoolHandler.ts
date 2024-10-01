import { CreateUserResponse } from '../../User/Response/CreateUserResponse';
import {sendMail} from '../../../Common/Helpers/emailUtils';
import { md5Encrypt } from '../../../Common/Helpers/passwordUtils';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';



export async function CreateSchoolHandler(data: any): Promise<CreateUserResponse|CoreException> {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  try {
    const session = await unitOfWork.startTransaction();
    const { schoolName, majorId , imagePath} = data;
        
    const schoolData: any = {
      schoolName, 
      majorId, 
      imagePath
    };
    const result: any = await unitOfWork.schoolRepository.createSchool(schoolData, session);

    await unitOfWork.commitTransaction();
  
    return new CreateUserResponse("Successful", StatusCodeEnums.OK_200, result);
  } catch (error: any) {
    await unitOfWork.abortTransaction();
    return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
  }
}
