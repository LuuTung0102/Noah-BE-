import mongoose, { Schema } from "mongoose";

export const BaseSchema: Schema = new mongoose.Schema({
    isDelete: {
        type: Boolean,
        default: false,
    },
    createTime: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updateTime: {
        type: Date,
        default: () => Date.now(),
    },
    isActive: {
        type: Boolean,
        default: true,
    },
})

