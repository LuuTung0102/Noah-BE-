import { BaseSchema } from './BaseEntities';
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const Answer = new mongoose.Schema({
    answerName: {
        type: String,
    },
    answerCode: {
        type: String,
    },
    questionName: {
        type: String,
    },
    questionCode: {
        type: String,
    },
    questionId: {
        type: mongoose.Types.ObjectId,
    },
    answer: {
        type: String,
    },
})

const AnswerWithBaseSchema = new mongoose.Schema({
    ...BaseSchema.obj,
    ...Answer.obj
})

export const AnswerWithBase = mongoose.model("AnswerWithBase", AnswerWithBaseSchema, "answers");
const AnswerModelWithBaseSchema = new mongoose.Schema({
    ...Answer.obj,
    ...BaseSchema.obj,
});
const models: { [key: string]: mongoose.Model<any> } = {}
export const AnswerModelWithBase = (collectionName : string) => {
    if (!models[collectionName]) { // Kiểm tra xem model đã tồn tại chưa
        const  AnswerModelWithBaseSchema =  new mongoose.Schema({
            ...Answer.obj,
            ...BaseSchema.obj,
        });
         models[collectionName] = mongoose.model(collectionName, AnswerModelWithBaseSchema, collectionName); // Lưu trữ model vào biến models
    }
    return models[collectionName];
}