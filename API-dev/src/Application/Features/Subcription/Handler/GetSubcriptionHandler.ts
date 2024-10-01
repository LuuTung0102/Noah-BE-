import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { GetSubscriptionResponse } from "../Response/GetSubscriptionResponse";

export async function GetSubcriptionHandler(data: any) {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  try {
    const { subscriptionId } = data;
    const query = {
      subscriptionId: subscriptionId,
      isActive: true,
      isDelete: false,
    };
    const result: any = await unitOfWork.subscriptionRepository.GetSubscriptionById(query);
    const responseData = {
      name: result.name,
      price: result.price,
      description: result.description,
      imagePath: result.imagePath,
    };
    return new GetSubscriptionResponse(
      "Successful",
      StatusCodeEnums.OK_200,
      responseData
    );
  } catch (error: any) {
    return new CoreException(
      StatusCodeEnums.InternalServerError_500,
      error.message
    );
  }
}
