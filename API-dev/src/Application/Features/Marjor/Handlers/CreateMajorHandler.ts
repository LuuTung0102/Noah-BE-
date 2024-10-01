import { CreateUserResponse } from '../../User/Response/CreateUserResponse';
import {sendMail} from '../../../Common/Helpers/emailUtils';
import { md5Encrypt } from '../../../Common/Helpers/passwordUtils';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';
import { CreateMajorRequest } from '../Requests/CreateMajorRequest';
import { CreateMajorResponse } from '../Reponse/CreateMajorResponse';



export async function CreateMajorHandler(data: any): Promise<CreateMajorResponse|CoreException> {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  try {
    const session = await unitOfWork.startTransaction();
    const { majorName , imagePath} = data;

    console.log("check data", data);
    const createMajor: any = {
      majorName, 
      imagePath
    };
    const result: any = await unitOfWork.majorRepository.createMajor(createMajor, session);
    await unitOfWork.commitTransaction();
    return new CreateMajorResponse("Successful", StatusCodeEnums.OK_200, result);
  } catch (error: any) {
    await unitOfWork.abortTransaction();
    return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
  }
}
