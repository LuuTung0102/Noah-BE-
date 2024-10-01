import mongoose from "mongoose";
import { OrderStatusEnums } from "../Enums/OrderStatusEnums";
import { BaseSchema } from "./BaseEntities";
import { User } from "./UserEntites";


export const Order  = new mongoose.Schema({
    orderId: {
        type: String,
    },
    orderCode: {
        type: String,
    },
    userId: {
        type: mongoose.Types.ObjectId,
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
    },
    subscription: {
        type: Array<Object>,
        default: null
    },
    subscriptionId : {
        type: Array<mongoose.Types.ObjectId>,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: OrderStatusEnums.PENDING,
    },
    qrLink: {
        type: String,
        default: null,
    },
    transactionId: {
        type: mongoose.Types.ObjectId,
        default: null,
    },
})

const OrderWithBaseSchema = new mongoose.Schema({
    ...BaseSchema.obj,
    ...Order.obj
})

export const OrderWithBase = mongoose.model("OrderWithBase", OrderWithBaseSchema, "orders");
