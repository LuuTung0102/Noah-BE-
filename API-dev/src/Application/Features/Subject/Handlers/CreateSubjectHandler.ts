import mongoose from "mongoose";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { md5Encrypt } from "../../../Common/Helpers/passwordUtils";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { importGiftFileHandler } from "../../File/Handlers/ImportGiftFileHandler";
import { GetMajorByIdHandler } from "../../Marjor/Handlers/GetMajorByIdHandler";
import { CreateSubjectResponse } from "../Response/CreateSubjectResponse";



export async function CreateSubjectHandler(data: any, file: string): Promise<CreateSubjectResponse | CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const session = await unitOfWork.startTransaction();
        let { majorId, subjectName, semester, imagePath } = data;

        const prefix = "subjects_";
        subjectName = prefix + subjectName;
        const subjectCode = await md5Encrypt(subjectName);


        const subjectId: any = new mongoose.Types.ObjectId().toString();
        
        const major: any = await GetMajorByIdHandler(majorId);
        const dataFile :any = {
            file:file,
            subjectId:subjectId
        }
        const fileData: any = await importGiftFileHandler(dataFile);
        const createData = {
            subjectId: subjectId,
            majorId: majorId,
            subjectName: subjectName,
            semester: semester,
            question: fileData._question,
            answer: fileData._answer,
            questionId : fileData._questionId,
            answerId:fileData._answerId,
            imagePath: imagePath,
            subjectCode: subjectCode,
            majorName: major.data.majorName
        }


        const result: any = await unitOfWork.subjectRepository.CreateSubject(createData, session);



        await unitOfWork.subjectRepository.CreateSubjectModel(createData);
        await unitOfWork.commitTransaction();

        return new CreateSubjectResponse("Succesfully", StatusCodeEnums.OK_200, result);
    } catch (error: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
    }
}
