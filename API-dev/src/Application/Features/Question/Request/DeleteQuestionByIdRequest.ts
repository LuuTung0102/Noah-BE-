export class deleteQuestionByIdRequest {
    public questionId: string;

    public getQuestionId(): string {
        return this.questionId;
    }

    public setQuestionId(questionId: string): void {
        this.questionId = questionId;
    }

}