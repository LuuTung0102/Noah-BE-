import mongoose from "mongoose";
import { BaseSchema } from "./BaseEntities";

export const Subscription = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
        default: 0,
        min: 0
    },
    description: {
        type: String,
    },
    imagePath: {
        type: String
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
    isMonthly: {
        type: Boolean,
    },
    unit: {
        type: Number,
    },
});

const SubscriptionWithBaseSchema = new mongoose.Schema({
    ...BaseSchema.obj,
    ...Subscription.obj,
})

export const SubscriptionWithBase = mongoose.model("SubcriptionWithBase", SubscriptionWithBaseSchema, "subscriptions");