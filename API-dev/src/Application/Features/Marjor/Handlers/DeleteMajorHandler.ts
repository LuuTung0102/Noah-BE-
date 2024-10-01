
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';
import { DeleteMajorResponse } from '../Reponse/DeleteMajorResponse';



export async function DeleteMajorHandler(majorId: any): Promise<DeleteMajorResponse|CoreException> {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  try {
    const session = await unitOfWork.startTransaction();
    const result: any = await unitOfWork.majorRepository.deleteMajorById(majorId, session);
    await unitOfWork.commitTransaction();
    return new DeleteMajorResponse("Successful", StatusCodeEnums.OK_200, result);
  } catch (error: any) {
    await unitOfWork.abortTransaction();
    return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
  }
}
