export class CreateSessionDTO {
    public userId: string;
    public email: string;
    public name: string ; 
    public username: string; 
    public jwttoken: string; 
    public refreshToken: string;
    public ExpireRefreshToken: string;
    public expireDate: Date;
    public deviceId: string;
    public ipAddress: string;

    constructor(userId: string, email: string, name: string, username: string, jwttoken: string, refreshToken: string, ExpireRefreshToken: string, expireDate: Date, deviceId: string, ipAddress: string) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.username = username;
        this.jwttoken = jwttoken;
        this.refreshToken = refreshToken;
        this.ExpireRefreshToken = ExpireRefreshToken;
        this.expireDate = expireDate;
        this.deviceId = deviceId;
        this.ipAddress = ipAddress;
    }
}