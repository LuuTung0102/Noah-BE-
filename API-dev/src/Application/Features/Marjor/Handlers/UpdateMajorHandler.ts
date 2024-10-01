import { CreateUserResponse } from '../../User/Response/CreateUserResponse';
import {sendMail} from '../../../Common/Helpers/emailUtils';
import { md5Encrypt } from '../../../Common/Helpers/passwordUtils';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';
import { UpdateMajorResponse } from '../Reponse/UpdateMajorResponse';




export async function UpdateMajorHandler(majorId:string, data: any): Promise<CreateUserResponse|CoreException> {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  try {
    const session = await unitOfWork.startTransaction();
    const {majorName, imagePath} = data;
        
    const createMajorData: any = {
      majorName: majorName,
      imagePath : imagePath
    };
    const result: any = await unitOfWork.majorRepository.updateMajorById(majorId, createMajorData, session);

    await unitOfWork.commitTransaction();
  
    return new UpdateMajorResponse("Successful", StatusCodeEnums.OK_200, result);
  } catch (error: any) {
    await unitOfWork.abortTransaction();
    return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
  }
}
