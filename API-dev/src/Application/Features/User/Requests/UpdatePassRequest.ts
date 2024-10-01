export class UpdatePassRequest {
    email: string;
    newpassword: string;

    constructor(email: string, newpassword: string) {
        this.email = email;
        this.newpassword = newpassword;
    }
}