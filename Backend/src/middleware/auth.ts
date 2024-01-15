import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UnauthenticatedError from "../error/unauthenticatedError";
import config from "../config";

export const auth= async (req:any,res:Response,next:NextFunction)=>{
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;

    if(!token){
      throw new UnauthenticatedError("No access Token");
    }

    const user = jwt.verify(token,config.jwt.accessTokenSecret!);
    
    req.user=user;

    next();
  } catch (error) {
    next(error);
  }
}