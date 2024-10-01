
import { User, UserWithBase } from "../../../Domain/Entities/UserEntites";
import IUserRepository from "../../../Application/Persistences/IRepositories/IUserRepository";
import mongoose, { ClientSession } from "mongoose";
import { hashPassword } from "../../../Application/Common/Helpers/passwordUtils";
// class UserRepository extends BaseRepository<User> implements IUserRepository {
//   constructor() {
//     const collectionName: string = "users";
//     super(collectionName);
//   }
class UserRepository implements IUserRepository {
  async updateUserById(
    userId: string,
    userData: any,
    session: ClientSession
  ): Promise<void> {
    try {
      const _id = new mongoose.Types.ObjectId(userId);
      const user: any = await UserWithBase.findByIdAndUpdate(_id, userData, {
        session,
      });
      const query: any = {
        _id: new mongoose.Types.ObjectId(userId),
      };
      // await this.updateDocument(query, user);
    } catch (error: any) {
      throw new Error(
        "Error at updateUserById in UserRepository: " + error.message
      );
    }
  }
  async updateUserConfirmEmail(
    userId: string,
    updateData: any,
    session: ClientSession
  ): Promise<void> {
    try {
      const _id = new mongoose.Types.ObjectId(userId);
      await UserWithBase.findByIdAndUpdate(_id, updateData, { session });
    } catch (error: any) {
      throw new Error(
        "Error at updateUserConfirmEmail in UserRepository: " + error.message
      );
    }
  }

  async getUserByEmail(
    email: string,
    queryData: any
  ): Promise<typeof UserWithBase> {
    try {
      const query: any = {
        email: email,
        isDelete: queryData.isDelete,
        isActive: queryData.isActive,
        emailConfirmed: queryData.emailConfirmed,
      };
      const users: any = await UserWithBase.findOne(query);
      return users;
    } catch (error: any) {
      throw new Error(
        "Error at getUserByEmail in UserRepository: " + error.message
      );
    }
  }
  async getUserByEmailAndName(
    email: string,
    username: string,
    queryData: any
  ): Promise<typeof UserWithBase | null> {
    try {
      const query: any = {
        $or: [{ email: email }, { username: username }],
        isActive: queryData.isActive,
        isDelete: queryData.isDelete,
      };
      const users: (typeof UserWithBase)[] = await UserWithBase.find(query);
      if (users == null) return null;
      return users[0];
    } catch (error: any) {
      throw new Error(
        "Error at getUserByEmailAndName in UserRepository: " + error.message
      );
    }
  }

  async createUser(
    userData: any,
    session: ClientSession
  ): Promise<typeof UserWithBase> {
    try {
      const hashedPassword = await hashPassword(userData.password);

      const user: any = await UserWithBase.create(
        [
          {
            fullname: userData.fullname,
            email: userData.email,
            subscriptionId: userData.subscriptionId,
            subscription: userData.subscription,
            username: userData.username,
            password: hashedPassword,
            phoneNumber: userData.phoneNumber,
            role_id: userData.role_id,
          },
        ],
        { session }
      );

      return user[0];
      // const user: any = new UserWithBase({
      //   fullname: userData.fullname,
      //   email: userData.email,
      //   username: userData.username,
      //   password: userData.password,
      //   phoneNumber: userData.phoneNumber,
      //   role_id: userData.role_id,
      //   // imageUser: null,
      //   // emailConfirmed: false,
      //   // phoneConfirmed: false,
      //   // emailCode: "awjkdalskd",
      //   // enable2FA: true,
      //   // twoFASecret: "asdkajlkwdjalkw"
      // });
      // // const userWithBase: any = new UserWithBase(user);
      // await this.insertDocuments(userWithBase);
    } catch (error: any) {
      throw new Error(
        "Error at createUser in UserRepository: " + error.message
      );
    }
  }

  async getUserById(queryData: any): Promise<typeof UserWithBase> {
    try {
      const query: any = {
				_id: new mongoose.Types.ObjectId(queryData.userId),
				isDelete: queryData.isDelete,
				isActive: queryData.isActive,
			};
      const user: (typeof UserWithBase)[] = await UserWithBase.find(query);
      return user[0];
    } catch (error: any) {
      throw new Error(
        "Error at getUserById in UserRepository: " + error.meesage
      );
    }
  }

  async changePasswordUser(
    queryData: any,
    session: ClientSession
  ): Promise<void> {
    try {
      const { userId, newPassword, isActive, isDelete } = queryData;

      const query: any = {
        _id: new mongoose.Types.ObjectId(userId),
        isDelete: isDelete,
        isActive: isActive,
      };

      const hashedPassword = await hashPassword(newPassword);
      const updateData: any = {
        password: hashedPassword,
      };

      // await this.updateDocument(query, updateData);
      await UserWithBase.updateOne(query, updateData, { session });
    } catch (error: any) {
      throw new Error("Error change password: " + error.message);
    }
  }
  async uploadPass(data: any, session: ClientSession): Promise<void> {
    try {
      // Hash mật khẩu mới trước khi cập nhật
      const { email, newPassword, emailConfirmed } = data;
      const hashedPassword = await hashPassword(newPassword);

      // Xây dựng điều kiện tìm kiếm user theo email
      const query: any = {
        email: email,
        isDelete: false, // Bạn có thể thêm các điều kiện khác nếu cần
        isActive: true,
      };

      // Xây dựng dữ liệu cập nhật với phép cập nhật trường hợp $set
      const updateData: any = {
        password: hashedPassword,
        emailConfirmed: emailConfirmed,
      };

      // Thực hiện phép cập nhật sử dụng $set
      // await this.updateDocument(query, updateData);
      await UserWithBase.updateOne(query, updateData, { session });
    } catch (error: any) {
      throw new Error("Error updating password: " + error.message);
    }
  }

  async uploadImage(data: any, session: ClientSession): Promise<string> {
    try {
      const { email, filename } = data;

      const query: any = {
        email: email,
        isDelete: false,
        isActive: true,
      };
      const updateData: any = {
        imageUser: filename,
      };
      // await this.updateDocument(query, updateData);
      await UserWithBase.updateOne(query, updateData, { session });
      return filename;
    } catch (error: any) {
      throw new Error("Error updating image: " + error.message);
    }
  }
}

export default UserRepository;

//     constructor() {
//         const collectionName: string = "User";
//         super(collectionName);
//     }
//     // public userRepository;
//     // public UserRepository() {
//     //     this.userRepository = new UserRepository(this.collection);
//     // }
//     async createUser(user: User): Promise<void>{
//         try {
//             const result = await this.insertDocuments(user);
//             console.log(result);
//         } catch (error) {
//             throw error;
//         }
//     }
//     async getAllUser(): Promise<User[]> {
//         try {
//             const query = {};
//             const result: User[] = await this.findDocuments(query, null, {});
//             console.log(result);
//             return result
//         } catch (error) {
//             throw error;
//         }
//     }
//     async updateUser(user: User): Promise<void>{
//         try {
//             const user = await this.findUser("b");
//             user[0].fullname = "asjkmndasjkdhasjkhd";
//             const id = user[0]._id
//             const query = {_id: id};
//             await this.updateDocument(query, user[0]);
//         } catch (error) {
//             throw error;
//         }
//     }
//     async findUser(userName: string): Promise<User[]> {
//         try {
//             const query = {fullname: userName};
//             const result: User[] = await this.findDocuments(query, null, {});
//             return result;

//         } catch (error) {
//             throw error;
//         }
//     }

//     async deleteUser(userId: string): Promise<void> {
//         try {
//             const id = new mongoose.Types.ObjectId(userId);
//             const query = {_id: id}
//             await this.deleteDocument(query);
//         } catch (error) {
//             throw error;
//         }
//     }
