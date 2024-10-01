import mongoose, { Types } from "mongoose";
import { Subject } from "./SubjectEntities";
import { Answer } from "./AnswerEntities";
import { BaseSchema } from "./BaseEntities";

export const Question = new mongoose.Schema({
    questionName: {
        type: String,
    },
    questionCode: {
        type: String,
    },
    questionTopic: {
        type: String,
        default: "",
    },
    questionDescription: {
        type: String,
        default: "",
    },
    subjectId: {
        type: Types.ObjectId,
        default: null,
    },
    answerId: {
        type: Array<mongoose.Types.ObjectId>,
        default: [],
    },
    answer: {
        type: Array<typeof Answer>,
        default: [],
    },
    isImage: {
        type: Boolean,
        default: false,
    },
    imagePath: {
        type: String,
        default: null,
    },
})

const QuestionWithBaseSchema = new mongoose.Schema({
    ...BaseSchema.obj,
    ...Question.obj,
})

export const QuestionWithBase = mongoose.model("QuestionWithBase", QuestionWithBaseSchema, "questions");

const QuestionModelWithBaseSchema = new mongoose.Schema({
    ...Question.obj,
    ...BaseSchema.obj,
});

const models: { [key: string]: mongoose.Model<any> } = {}
export const QuestionModelWithBase = (collectionName : string) => {
    if (!models[collectionName]) { // Kiểm tra xem model đã tồn tại chưa
        const  QuestionModelWithBaseSchema =  new mongoose.Schema({
            ...Question.obj,
            ...BaseSchema.obj,
        });
         models[collectionName] = mongoose.model(collectionName, QuestionModelWithBaseSchema, collectionName); // Lưu trữ model vào biến models
    }
    return models[collectionName];
}