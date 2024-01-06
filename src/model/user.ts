import { ISignup } from "../interface/auth";
import BaseModel from "./baseModel";

export default class UserModel extends BaseModel {

  static async getUserByUsername(username: string) {
    const user = await this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        email: "email",
        password: "password",
      })
      .from("users")
      .where({ username })
      .first();
    return user;
  }

  static async getUserById(id: number) {
    const user = await this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        email: "email",
        password: "password",
      })
      .from("users")
      .where({ id })
      .first();
    return user;
  }

  static async createUser(user:ISignup){
    return this.queryBuilder().insert(user).table("users");
  }

  static async updateUser(id:number,user:ISignup){
    return this.queryBuilder().update(user).table("users").where({id});
  }

  static async deleteUser(id:number){
    return this.queryBuilder().table("users").where({id}).del();
  }
}
