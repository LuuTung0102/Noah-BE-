import { SemesterEnum } from "../../../../Domain/Enums/SemesterEnum";

export class CreateSubjectRequest{
    public majorId: string;
    public subjectName: string;
    public semester: SemesterEnum;
    public imagePath?: string;
}