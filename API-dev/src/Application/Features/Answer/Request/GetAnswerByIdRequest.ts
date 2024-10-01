export class getAnswerByIdRequest {
    public answerId: string;

    public getAnswerId(): string {
        return this.answerId;
    }

    public setAnswerId(answerId: string): void {
        this.answerId = answerId;
    }
}