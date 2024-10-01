import { BaseSchema } from './BaseEntities';
import mongoose, { Types } from "mongoose";
import { Question } from './QuestionEntities';
import { Answer } from './AnswerEntities';

export const Subject = new mongoose.Schema({
    marjorId: {
        type: mongoose.Types.ObjectId,
    },
    subjectName: {
        type: String,
        required: true
    },
    subjectCode: {
        type: String,
    },
    semester: {
        type: Number
    },
    questionId: {
        type: Array<mongoose.Types.ObjectId>,
        default: []
    },
    question:{
        type: Array<typeof Question>,
        default : []
    },
    answer: {
        type: Array<typeof Answer>,
        default: []
    },
    answerId: {
        type: Array<mongoose.Types.ObjectId>,
        default: []
    },
    imagePath: {
        type: String,
    },
    majorName: {
        type: String,
    }
})

const SubjectWithBaseSchema = new mongoose.Schema({
    ...BaseSchema.obj,
    ...Subject.obj,
});




export const SubjectWithBase = mongoose.model("SubjectWithBase", SubjectWithBaseSchema, "subjects");

const models: { [key: string]: mongoose.Model<any> } = {}
export const SubjectModelWithBase = (collectionName : string) => {
    // const SubjectModelWithBaseSchema = new mongoose.Schema({
    //     ...Subject.obj,
    //     ...BaseSchema.obj,
    // });
    // return mongoose.model( collectionName, SubjectModelWithBaseSchema, collectionName);
    if (!models[collectionName]) { // Kiểm tra xem model đã tồn tại chưa
        const  SubjectModelWithBaseSchema =  new mongoose.Schema({
            ...Subject.obj,
            ...BaseSchema.obj,
        });
         models[collectionName] = mongoose.model(collectionName, SubjectModelWithBaseSchema, collectionName); // Lưu trữ model vào biến models
    }
    return models[collectionName];
}
