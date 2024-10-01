//import { BaseEntities } from "./BaseEntites";

import mongoose from "mongoose";
import { BaseSchema } from "./BaseEntities";

export const SessionLogin = new mongoose.Schema({
    userId: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    username: {
        type: String
    },
    jwttoken: {
        type: String
    },
    refreshToken: {
        type: String
    },
    expireRefreshToken: {
        type: Date
    },
    expireDate: {
        type: Date
    },
    deviceId: {
        type: String
    },
    ipAddress: {
        type: String
    }
})

const SessionWithBaseSchema = new mongoose.Schema({
    ...BaseSchema.obj,
    ...SessionLogin.obj,
})

export const SessionWithBase = mongoose.model("SessionWithBase", SessionWithBaseSchema, "sessions");


/*class SessionLogin {
    private userId: string;
    private email: string;
    private name: string;
    private username: string;
    private jwttoken: string;
    private refreshToken: string;
    private expireRefreshToken: string;
    private expireDate: Date;
    private deviceId: string;
    private ipAddress: string;
    private dbName: string;


    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getJwttoken(): string {
        return this.jwttoken;
    }

    public setJwttoken(jwttoken: string): void {
        this.jwttoken = jwttoken;
    }

    public getRefreshToken(): string {
        return this.refreshToken;
    }

    public setRefreshToken(refreshToken: string): void {
        this.refreshToken = refreshToken;
    }

    public getExpireRefreshToken(): string {
        return this.expireRefreshToken;
    }

    public setExpireRefreshToken(expireRefreshToken: string): void {
        this.expireRefreshToken = expireRefreshToken;
    }

    public getExpireDate(): Date {
        return this.expireDate;
    }

    public setExpireDate(expireDate: Date): void {
        this.expireDate = expireDate;
    }

    public getDeviceId(): string {
        return this.deviceId;
    }

    public setDeviceId(deviceId: string): void {
        this.deviceId = deviceId;
    }

    public getIpAddress(): string {
        return this.ipAddress;
    }

    public setIpAddress(ipAddress: string): void {
        this.ipAddress = ipAddress;
    }

    public getDbName(): string {
        return this.dbName;
    }

    public setDbName(dbName: string): void {
        this.dbName = dbName;
    }

    constructor(
        userId: string,
        email: string,
        name: string,
        username: string,
        jwttoken: string,
        refreshToken: string,
        expireRefreshToken: string,
        expireDate: Date,
        deviceId: string,
        ipAddress: string,
        dbName: string
    ) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.username = username;
        this.jwttoken = jwttoken;
        this.refreshToken = refreshToken;
        this.expireRefreshToken = expireRefreshToken;
        this.expireDate = expireDate;
        this.deviceId = deviceId;
        this.ipAddress = ipAddress;
        this.dbName = dbName;
    }
}

class SessionWithBase extends BaseEntities {
    private sessionLogin!: SessionLogin;
    constructor(sessionLogin: SessionLogin) {
        super();
        Object.assign(this, sessionLogin);
    }
    public getUserId(): string {
        return this.sessionLogin.getUserId();
    }

    public setUserId(userId: string): void {
        this.sessionLogin.setUserId(userId);
    }

    public getEmail(): string {
        return this.sessionLogin.getEmail();
    }

    public setEmail(email: string): void {
        this.sessionLogin.setEmail(email);
    }

    public getName(): string {
        return this.sessionLogin.getName();
    }

    public setName(name: string): void {
        this.sessionLogin.setName(name);
    }

    public getUsername(): string {
        return this.sessionLogin.getUsername();
    }

    public setUsername(username: string): void {
        this.sessionLogin.setUsername(username);
    }

    public getJwttoken(): string {
        return this.sessionLogin.getJwttoken();
    }

    public setJwttoken(jwttoken: string): void {
        this.sessionLogin.setJwttoken(jwttoken);
    }

    public getRefreshToken(): string {
        return this.sessionLogin.getRefreshToken();
    }

    public setRefreshToken(refreshToken: string): void {
        this.sessionLogin.setRefreshToken(refreshToken);
    }

    public getExpireRefreshToken(): string {
        return this.sessionLogin.getExpireRefreshToken();
    }

    public setExpireRefreshToken(expireRefreshToken: string): void {
        this.sessionLogin.setExpireRefreshToken(expireRefreshToken);
    }

    public getExpireDate(): Date {
        return this.sessionLogin.getExpireDate();
    }

    public setExpireDate(expireDate: Date): void {
        this.sessionLogin.setExpireDate(expireDate);
    }

    public getDeviceId(): string {
        return this.sessionLogin.getDeviceId();
    }

    public setDeviceId(deviceId: string): void {
        this.sessionLogin.setDeviceId(deviceId);
    }

    public getIpAddress(): string {
        return this.sessionLogin.getIpAddress();
    }

    public setIpAddress(ipAddress: string): void {
        this.sessionLogin.setIpAddress(ipAddress);
    }

    public getDbName(): string {
        return this.sessionLogin.getDbName();
    }

    public setDbName(dbName: string): void {
        this.sessionLogin.setDbName(dbName);
    }
}

export { SessionLogin, SessionWithBase };*/
