import { IPayosService } from "./IPayosService";
import { OrderStatusEnums } from "./../../../Domain/Enums/OrderStatusEnums";
import axios from "axios";
import { PayosModel } from "./Model/PayosModel";
import { CoreException } from "../../../Application/Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../Domain/Enums/StatusCodeEnums";
import { IUnitOfWork } from "../../../Application/Persistences/IRepositories/IUnitOfWork";
import { UnitOfWork } from "../../Persistences/Respositories/UnitOfWork";
import { v4 as uuidv4 } from "uuid";
import {
  generateTimeStamp,
  hmacSHA256,
} from "../../../Application/Common/Helpers/stringUtils";
import { md5Encrypt } from "../../../Application/Common/Helpers/passwordUtils";
import PayosResponseModel from "./Model/PayosResponseModel";
require("dotenv").config();
const PAYOS_CLIENT_KEY = process.env.PAYOS_CLIENT_ID;
const PAYOS_API_KEY = process.env.PAYOS_API_KEY;
// const PAYOS_CHECKSUM_KEY = process.env.PAYOS_CHECKSUM_KEY;
// const API_SAVE_ORDER_ENDPOINT = process.env.API_SAVE_ORDER_ENDPOINT;

const PAYOS_API_ENDPOINT = "https://api-merchant.payos.vn/v2/payment-requests";
const headers = {
  "x-client-id": PAYOS_CLIENT_KEY,
  "x-api-key": PAYOS_API_KEY,
};

export default class PayosService implements IPayosService {
  async PayosGateWayCreatePaymentLink(data: PayosModel): Promise<Object> {
    try {
      const url = `${PAYOS_API_ENDPOINT}`;
      const result = await axios.post(url, data, {
        headers: headers,
      });
      return result.data;
    } catch (error: any) {
      return new CoreException(
        StatusCodeEnums.InternalServerError_500,
        error.message
      );
    }
  }
  async PayosGateWayGetPaymentLink(id: string): Promise<Object> {
    try {
      const url = `${PAYOS_API_ENDPOINT}/${id}`;

      const result = await axios.get(url, {
        headers: headers,
      });
      return new PayosResponseModel(
        "Successful",
        StatusCodeEnums.OK_200,
        result.data.data
      );
    } catch (error: any) {
      return new CoreException(
        StatusCodeEnums.InternalServerError_500,
        error.message
      );
    }
  }

  async PayosGateWayCancelPayment(
    id: string,
    cancellationReason: string
  ): Promise<Object> {
    try {
      const url = `https://api-merchant.payos.vn/v2/payment-requests/${id}/cancel`;
      const result = await axios.post(url, cancellationReason, {
        headers: headers,
      });
      return new PayosResponseModel(
        "Successful",
        StatusCodeEnums.OK_200,
        result.data.data
      );
    } catch (error: any) {
      return new CoreException(
        StatusCodeEnums.InternalServerError_500,
        error.message
      );
    }
  }

  async PurchaseWithPayos(payosData: any): Promise<Object | CoreException> {
    try {
      const result: any = await this.PayosGateWayCreatePaymentLink(payosData);
      if (!result.data)
        return new CoreException(
          StatusCodeEnums.InternalServerError_500,
          result.desc
        );
      return result.data;
    } catch (error: any) {
      return new CoreException(
        StatusCodeEnums.InternalServerError_500,
        error.message
      );
    }
  }

  // async PurchaseWithPayos(
  //   subscriptionId: string
  // ): Promise<Object | CoreException> {
  //   try {
  //     const subscriptionQuery = {
  //       subscriptionId: subscriptionId,
  //       isDelete: false,
  //       isActive: true,
  //     };
  //     const subscriptionWithBase: any =
  //       await this.unitOfWork.subscriptionRepository.GetSubscriptionById(
  //         subscriptionQuery
  //       );
  //     const subscription = {
  //       id: subscriptionWithBase._id,
  //       name: subscriptionWithBase.name,
  //       price: subscriptionWithBase.price,
  //       quantity: 1,
  //       description: subscriptionWithBase.description,
  //     };

  //     const orderCode = parseInt(await generateTimeStamp());
  //     const amount = subscription.price;
  //     const description = `Purchase subscription ${subscription.name}`;
  //     const cancelUrl = `${API_SAVE_ORDER_ENDPOINT}`;
  //     const returnUrl = `${API_SAVE_ORDER_ENDPOINT}`;
  //     const expiredAt = parseInt(await generateTimeStamp()) + 10 * 60;
  //     const hashString = `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`;
  //     const signature = await hmacSHA256(PAYOS_CHECKSUM_KEY, hashString);
  //     const payosData: PayosModel = {
  //       orderCode: orderCode,
  //       amount: amount,
  //       description: description,
  //       items: [subscription],
  //       cancelUrl: cancelUrl,
  //       returnUrl: returnUrl,
  //       expiredAt: expiredAt,
  //       signature: signature,
  //     };
  //     const result: any = await this.PayosGateWayCreatePaymentLink(payosData);
  //     if (!result.data)
  //       return new CoreException(
  //         StatusCodeEnums.InternalServerError_500,
  //         result.desc
  //       );
  //     const responseData = {
  //       subscription: subscription,
  //       gatewayData: result.data,
  //     };
  //     return responseData;
  //   } catch (error: any) {
  //     return new CoreException(
  //       StatusCodeEnums.InternalServerError_500,
  //       error.message
  //     );
  //   }
  // }
}
