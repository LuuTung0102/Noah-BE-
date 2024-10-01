import { GetProfileUserResponse } from "../Response/GetProfileUserRespone";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";

export async function getProfileHandler(userId: string): Promise<GetProfileUserResponse|CoreException> {
    try {
      const unitOfWork: IUnitOfWork = new UnitOfWork();
      await unitOfWork.startTransaction();
     
      const queryData: any = {
          userId: userId,
          isDelete: false,
          isActive: true,
          emailConfirmed: false || true,
      }
      const userProfile: any = await unitOfWork.userRepository.getUserById(queryData);
      if (!userProfile) {
        return new CoreException(StatusCodeEnums.InternalServerError_500, "User not found!");
      }
      return new GetProfileUserResponse("Get user profile successful", StatusCodeEnums.OK_200, userProfile);
    } catch (error: any) {
        return new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
    }
}