import { IUnitOfWork } from './../../../Persistences/IRepositories/IUnitOfWork';
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { CreateSubscriptionResponse } from '../Response/CreateSubscriptionResponse';

export async function CreateSubcriptionHandler(data: any) {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const session = await unitOfWork.startTransaction();
        const {description, name, price, imagePath, isDefault, isMonthly, unit} = data;
        const createSubcriptionData = {
            isDefault: isDefault,
            description: description,
            name: name,
            price: price,
            imagePath: imagePath,
            isMonthly: isMonthly,
            unit: unit,
        };
        const result = await unitOfWork.subscriptionRepository.CreateSubscription(createSubcriptionData, session);
        console.log(result);
        await unitOfWork.commitTransaction();
        return new CreateSubscriptionResponse("Create new Item successful", StatusCodeEnums.Created_201, createSubcriptionData);
    } catch (error: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
    }
}