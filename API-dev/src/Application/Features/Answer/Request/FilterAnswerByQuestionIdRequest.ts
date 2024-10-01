export class filterAnswerByQuestionIdRequest {
    public questionId: string;
    questionCode: string;
    public getQuestionId(): string {
        return this.questionId;
    }

    public setQuestionId(questionId: string): void {
        this.questionId = questionId;
    }
}