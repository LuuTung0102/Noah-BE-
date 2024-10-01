export class createQuestionRequest {
    public questionTopic: string;
    public questionDescription: string;
    public subjectId: string;
    public answerId?: string;
    public isImage: boolean;
    public imagePath: string;
}