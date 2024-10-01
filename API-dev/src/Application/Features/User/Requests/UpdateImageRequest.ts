export class UpdateImageRequest {
    email: string;
    imageUser: string;

    constructor(email: string, imageUser: string) {
        this.email = email;
        this.imageUser = imageUser;
    }
}