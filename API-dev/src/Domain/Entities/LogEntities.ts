import { BaseSchema } from './BaseEntities';
import mongoose, { Types } from "mongoose";


export const Log = new mongoose.Schema({
    userId: {
        type: Types.ObjectId,
    },
    schoolId: {
        type: Types.ObjectId,

    },
    majorId: {
        type: Types.ObjectId,

    },
    subjectId: {
        type: Types.ObjectId,

    }
})

const LogWithBaseSchema = new mongoose.Schema({
    ...Log.obj,
    ...BaseSchema.obj,
});




export const LogWithBase = mongoose.model("LogWithBase", LogWithBaseSchema, "logs");

