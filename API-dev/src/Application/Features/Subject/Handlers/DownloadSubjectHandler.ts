import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { DownloadSubjectResponse } from "../Response/DownloadSubjectResponse";
import cron from 'node-cron'
import * as fs from 'fs'
import * as path from 'path'
import { CleanupDownloads } from '../../../../Infrastructure/Scheduler/CleanupDownload';
require('dotenv').config();
const API_ENDPOINT_HOST = process.env.API_ENDPOINT_HOST;
export async function DownloadSubjectHandler(data: any, res : any): Promise<void |DownloadSubjectResponse | CoreException | string> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    // const subjectCodeUnhash = `subjects_${data}`
    try {
        const {subjectId} = data;
        // const session = unitOfWork.startTransaction();
        // const subjectCode = await md5Encrypt(subjectCodeUnhash);
        const rootSubjectCollectionQueryData: any = {
            subjectId : subjectId,
            isActive : true,
            isDelete : false
        }
        const rootSubjectCollection: any = await unitOfWork.subjectRepository.GetSubjectById(rootSubjectCollectionQueryData);
        const subjectQueryData = {
            subjectCode: rootSubjectCollection.subjectCode,
            isDelete: false,
            isActive: true,
        }
        const subject: any = await unitOfWork.subjectRepository.GetSubjectBySubjectCode(rootSubjectCollection.subjectName, subjectQueryData);
        const downloadData : any ={
            subjectCodeUnhash : subject.subjectName,
            subjectCodeHash : subject.subjectCode,
            question : subject.question,
            answer: subject.answer
            
        }
        const fileName = `${subject.subjectName}`
        const destinationPath = path.join(__dirname + '../../../../../..', 'downloads', fileName);
        console.log(destinationPath);
        fs.writeFileSync(destinationPath,JSON.stringify(downloadData));
        const url = '/downloads/' + fileName;
        const job = cron.schedule('*/10 * * * *', () => {
            console.log('10m: auto delete file after 10 minutes !');
            CleanupDownloads(destinationPath, job);
            
        }, {
            scheduled: true
        });
        // res.setHeader('Content-Disposition', 'attachment; filename='+ destinationPath);
        // res.setHeader('Content-Type', 'application/json');
        // const fileStream = fs.createReadStream(destinationPath);
        // fileStream.pipe(res);
        // await unitOfWork.commitTransaction();
        return new DownloadSubjectResponse("Succesfully", StatusCodeEnums.OK_200, {url: url});
    } catch (error: any) {
        // await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
    }
}