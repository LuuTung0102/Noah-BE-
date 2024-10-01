import mongoose from "mongoose";
import { BaseSchema } from "./BaseEntities";

export const Major = new mongoose.Schema({
    majorName: {
        type: String,
    },
    imagePath: {
        type: String,
    }
})

const MajorWithBaseSchema = new mongoose.Schema({
    ...BaseSchema.obj,
    ...Major.obj
})

export const MajorWithBase = mongoose.model("MajorWithBase", MajorWithBaseSchema, "majors");