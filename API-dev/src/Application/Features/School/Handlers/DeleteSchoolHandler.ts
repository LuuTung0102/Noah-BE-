import { CreateUserResponse } from '../../User/Response/CreateUserResponse';
import {sendMail} from '../../../Common/Helpers/emailUtils';
import { md5Encrypt } from '../../../Common/Helpers/passwordUtils';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';
import { CreateSchoolRequest } from '../Requests/CreateSchoolRequest';
import { DeleteSchoolResponse } from '../Response/DeleteSchoolResponse';



export async function DeleteSchoolHandler(schoolId: any): Promise<CreateUserResponse|CoreException> {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  try {
    const session = await unitOfWork.startTransaction();

    const result: any = await unitOfWork.schoolRepository.deleteSchoolById(schoolId, session);

    await unitOfWork.commitTransaction();
  
    return new DeleteSchoolResponse("Successful", StatusCodeEnums.OK_200, result);
  } catch (error: any) {
    await unitOfWork.abortTransaction();
    return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
  }
}
