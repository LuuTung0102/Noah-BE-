import mongoose, { Types } from "mongoose";
import speakeasy from "speakeasy";
import { BaseSchema } from "./BaseEntities";

const isValidObjectId = (value: Types.ObjectId) => {
  return mongoose.Types.ObjectId.isValid(value);
};

export const User = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  role_id: {
    type: Types.ObjectId,
    validate: {
      validator: isValidObjectId,
    }
  },
  subscriptionId: {
    type: mongoose.Types.ObjectId,
  },
  subscription: {
    type: Object,
  },
  startDateSubscription: {
    type: Date,
    default: () => Date.now(),
  },
  endDateSubscription: {
    type: Date,
    default: null,
  },
  imageUser: {
    type: String || null,
    default: null,
  },
  schoolID :{
    type: Array<mongoose.Types.ObjectId>,
    default: null,
    ref:"School"
  },
  emailConfirmed: {
    type: Boolean,
    default: false,
  },
  phoneConfirmed: {
    type: Boolean,
    default: false,
  },
  emailCode: {
    type: String,
    default: Math.random().toString(36).substring(2, 7),
  },
  enable2FA: {
    type: Boolean,
    default: false,
  },
  twoFASecret: {
    type: String,
    default: speakeasy.generateSecret({ length: 20 }).base32,
  }
})


const UserWithBaseSchema = new mongoose.Schema({
  ...User.obj,
  ...BaseSchema.obj
})

export const UserWithBase = mongoose.model("UserWithBase", UserWithBaseSchema, "users");

// import { ObjectId } from 'mongodb';
// import { BaseEntities } from "./BaseEntites";
// import mongoose, { Document, Mongoose, Types } from "mongoose";
// import bcrypt from "bcryptjs";
// import speakeasy from "speakeasy";

// class User {
//   private id ?: string;
//   private fullname: string;
//   private email: string;
//   private username: string;
//   private password: string;
//   private phoneNumber: string;
//   private role_id: Types.ObjectId;
//   private imageUser: string | null;
//   private emailConfirmed: boolean;
//   private phoneConfirmed: boolean;
//   private emailCode: string;
//   private enable2FA: boolean;
//   private twoFASecret: string;


//   public getFullname(): string {
//     return this.fullname;
//   }

//   public setFullname(fullname: string): void {
//     this.fullname = fullname;
//   }

//   public getId(): any {
//     return this.id;
//   }

//   public getEmail(): string {
//     return this.email;
//   }

//   public setEmail(email: string): void {
//     this.email = email;
//   }

//   public getUsername(): string {
//     return this.username;
//   }

//   public setUsername(username: string): void {
//     this.username = username;
//   }

//   public getPassword(): string {
//     return this.password;
//   }

//   public setPassword(password: string): void {
//     this.password = password;
//   }

//   public getPhoneNumber(): string {
//     return this.phoneNumber;
//   }

//   public setPhoneNumber(phoneNumber: string): void {
//     this.phoneNumber = phoneNumber;
//   }

//   public getRole_id(): Types.ObjectId{
//     return this.role_id;
//   }

//   public setRole_id(role_id: Types.ObjectId): void {
//     this.role_id = role_id;
//   }

//   public getImageUser(): string | null{
//     return this.imageUser;
//   }

//   public setImageUser(imageUser: string): void {
//     this.imageUser = imageUser;
//   }

//   public isEmailConfirmed(): boolean {
//     return this.emailConfirmed;
//   }

//   public setEmailConfirmed(emailConfirmed: boolean): void {
//     this.emailConfirmed = emailConfirmed;
//   }

//   public isPhoneConfirmed(): boolean {
//     return this.phoneConfirmed;
//   }

//   public setPhoneConfirmed(phoneConfirmed: boolean): void {
//     this.phoneConfirmed = phoneConfirmed;
//   }

//   public getEmailCode(): string {
//     return this.emailCode;
//   }

//   public setEmailCode(emailCode: string): void {
//     this.emailCode = emailCode;
//   }

//   public isEnable2FA(): boolean {
//     return this.enable2FA;
//   }

//   public setEnable2FA(enable2FA: boolean): void {
//     this.enable2FA = enable2FA;
//   }

//   public getTwoFASecret(): string {
//     return this.twoFASecret;
//   }

//   public setTwoFASecret(twoFASecret: string): void {
//     this.twoFASecret = twoFASecret;
//   }

//   constructor(
//     fullname: string,
//     email: string,
//     username: string,
//     password: string,
//     phoneNumber: string,
//     role_id: Types.ObjectId,
//     imageUser: string | null
//   ) {
//     this.fullname = fullname;
//     this.email = email;
//     this.username = username;
//     this.password = password;
//     this.phoneNumber = phoneNumber;
//     this.role_id = role_id;
//     this.imageUser = imageUser;
//     this.emailConfirmed = false;
//     this.phoneConfirmed = false;
//     this.emailCode = Math.random().toString(36).substring(2, 7);
//     this.enable2FA = false;
//     this.twoFASecret = speakeasy.generateSecret({ length: 20 }).base32;
//     if (!mongoose.Types.ObjectId.isValid(role_id)) {
//       this.role_id = new mongoose.Types.ObjectId(role_id); //convert role_id from string or another data types into mongoose ObjectId
//     } else {
//       this.role_id = role_id;
//     }
//   }

//   async isCorrectPassword(plainPassword: string): Promise<boolean> {
//     try {
//       return await bcrypt.compare(plainPassword, this.password);
//     } catch (error) {
//       return false;
//     }
//   }
// }

// class UserWithBase extends BaseEntities {
//   private user!: User
//   constructor(user: User) {
//     super();
//     Object.assign(this, user);
//   }


//   getFullname(): string {
//     return this.user.getFullname();
//   }

//   setFullname(fullname: string): void {
//     this.user.setFullname(fullname);
//   }

//   getEmail(): string {
//     return this.user.getEmail();
//   }

//   setEmail(email: string): void {
//     this.user.setEmail(email);
//   }

//   getUsername(): string {
//     return this.user.getUsername();
//   }

//   setUsername(username: string): void {
//     this.user.setUsername(username);
//   }

//   getPassword(): string {
//     return this.user.getPassword();
//   }

//   setPassword(password: string): void {
//     this.user.setPassword(password);
//   }

//   getPhoneNumber(): string {
//     return this.user.getPhoneNumber();
//   }

//   setPhoneNumber(phoneNumber: string): void {
//     this.user.setPhoneNumber(phoneNumber);
//   }

//   getRole_id(): Types.ObjectId{
//     return this.user.getRole_id();
//   }

//   setRole_id(role_id: Types.ObjectId): void {
//     this.user.setRole_id(role_id);
//   }

//   getImageUser(): string | null{
//     return this.user.getImageUser();
//   }

//   setImageUser(imageUser: string): void {
//     this.user.setImageUser(imageUser);
//   }

//   isEmailConfirmed(): boolean {
//     return this.user.isEmailConfirmed();
//   }

//   setEmailConfirmed(emailConfirmed: boolean): void {
//     this.user.setEmailConfirmed(emailConfirmed);
//   }

//   isPhoneConfirmed(): boolean {
//     return this.user.isPhoneConfirmed();
//   }

//   setPhoneConfirmed(phoneConfirmed: boolean): void {
//     this.user.setPhoneConfirmed(phoneConfirmed);
//   }

//   getEmailCode(): string {
//     return this.user.getEmailCode();
//   }

//   setEmailCode(emailCode: string): void {
//     this.user.setEmailCode(emailCode);
//   }

//   isEnable2FA(): boolean {
//     return this.user.isEnable2FA();
//   }

//   setEnable2FA(enable2FA: boolean): void {
//     this.user.setEnable2FA(enable2FA);
//   }

//   getTwoFASecret(): string {
//     return this.user.getTwoFASecret();
//   }

//   setTwoFASecret(twoFASecret: string): void {
//     this.user.setTwoFASecret(twoFASecret);
//   }

//   async isCorrectPassword(plainPassword: string): Promise<Boolean> {
//     try {
//       return await bcrypt.compare(plainPassword, (this as any).password);
//     } catch (error) {
//       return false;
//     }
//   }
// }

// export { User, UserWithBase };
