import NotFoundError from "../error/notFoundError";
import { ISignup } from "../interface/auth";
import UserModel from "../model/user";

export async function getUserById(id:number){
  const user = await UserModel.getUserById(id);
  if(!user){
    throw new NotFoundError("User Not Found");
  }
  return user;
}

export async function getUserByUsername(username:string){
  const user = await UserModel.getUserByUsername(username);
  // if(!user){
  //   throw new NotFoundError("User Not Found");
  // }
  return user;
}

export async function createUser(user:ISignup){
  return await UserModel.createUser(user);
}

export async function updateUser(id:number,userDetail:ISignup){
  const user= await UserModel.getUserById(id);
  if(!user){
    throw new NotFoundError("User Not Found");
  }
  const updatedUser = await UserModel.updateUser(id,userDetail);
  return updateUser;
}

export async function deleteUser(id:number){
  const user =UserModel.getUserById(id);
  if(!user){
    throw new NotFoundError("User Not Found");
  }
  await UserModel.deleteUser(id);
}