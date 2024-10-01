import mongoose, { Schema } from "mongoose";

import { BaseSchema } from "./BaseEntities";
import { ISchool } from "../../Application/Persistences/IRepositories/ISchoolRepository";

const School = new mongoose.Schema<ISchool>({
    schoolName: {
        type: String,
        required:true
    },
    majorId:{
        type: Array<mongoose.Types.ObjectId>,
        ref: "Major"
    },
    imagePath: {
        type: String,
        required:true
    }
})

const SchoolWithBaseSchema = new mongoose.Schema({
    ...School.obj,
    ...BaseSchema.obj
})

export const SchoolWithBase = mongoose.model<ISchool>("SchoolWithBase", SchoolWithBaseSchema, "schools");
