import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import ConflictError from "../error/conflictError";
import { ILogin, ISignup } from "../interface/auth";
import * as userServices from "./userServices";
import { ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME, SALT_ROUNDS } from "../constants/authConstants";
import NotFoundError from "../error/notFoundError";
import UnauthenticatedError from "../error/unauthenticatedError";
import config from "../config";

export async function signup(body:ISignup){
  //Existing User check
  const isExistingUser = await userServices.getUserByUsername(body.username);
  if(isExistingUser){
    throw new ConflictError("User with the username already exists");
  }

  //Hashed Password
  const hashedPassword =await bcrypt.hash(body.password,SALT_ROUNDS);

  //User Creation
  const newUser={
    ...body,
    password:hashedPassword
  }
  await userServices.createUser(newUser);
  return {user:newUser , message:"User signed up successfully"};
}

export async function login(body:ILogin){
  //Find user by username
  const user= await userServices.getUserByUsername(body.username);
  if(!user){
    throw new NotFoundError("Invalid username or password");
  }

  //Compare entered password
  const isPasswordValid= await bcrypt.compare(body.password,user.password);
  if(!isPasswordValid){
    throw new UnauthenticatedError("Invalid username or password");
  }

  //Generate Jwt access token
  const accessToken = jwt.sign({id:user.id , username:user.username},config.jwt.accessTokenSecret!,{expiresIn: ACCESS_TOKEN_TIME});

  //Generate Jwt refresh token
  const refreshToken = jwt.sign({id:user.id , username:body.username},config.jwt.refreshTokenSecret!,{expiresIn: REFRESH_TOKEN_TIME});

  return{accessToken,refreshToken};
}

export async function regenerateToken(token:string){
  const payload:any= jwt.verify(token,config.jwt.refreshTokenSecret!);

  delete payload.iat;
  delete payload.exp;

  const accessToken = jwt.sign(payload,config.jwt.accessTokenSecret!,{expiresIn: ACCESS_TOKEN_TIME});
  const refreshToken = jwt.sign(payload,config.jwt.refreshTokenSecret!,{expiresIn: REFRESH_TOKEN_TIME});

  return{message:"Token regenerated",accessToken,refreshToken};
}