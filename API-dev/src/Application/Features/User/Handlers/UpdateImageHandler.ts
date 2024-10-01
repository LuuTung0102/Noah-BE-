import { UpdateImageResponse } from "../Response/UpdateImageResponse";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";


export async function UpdateImageHandler(data: any): Promise<UpdateImageResponse | CoreException> {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  try {
    const session = await unitOfWork.startTransaction();
    const { email, filename } = data;

    // const userRepository: IUserRepository = new UserRepository();
    const queryData: any = {
      isDelete: false,
      isActive: true,
      emailConfirmed: true,
    };
    const user: any = await unitOfWork.userRepository.getUserByEmail(email, queryData);

    if (!user) {
      return new CoreException(StatusCodeEnums.InternalServerError_500, "User not found!");
    }

    const updateData = {
      email: email,
      filename: filename,
    };
    const result: any = await unitOfWork.userRepository.uploadImage(updateData, session);
    await unitOfWork.commitTransaction();
    return new UpdateImageResponse("Image updated successfully", StatusCodeEnums.OK_200,result);
  } catch (error: any) {
    await unitOfWork.abortTransaction();
    return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
  }
}

export default UpdateImageHandler;