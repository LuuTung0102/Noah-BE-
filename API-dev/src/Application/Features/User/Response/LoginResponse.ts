import { BaseResponse } from './../../../Common/Model/Response/BaseResponse';
export class LoginResponse extends BaseResponse {
    private data: {
        accessToken: string;
        refreshToken: string;
        expireIn: string;
    }
    
    constructor(message: string, statusCode: number, data: { accessToken: string, refreshToken: string, expireIn: string }, error?: string) {
        super(message, statusCode, data, error);
        this.data = {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            expireIn: data.expireIn
        };
    }
}