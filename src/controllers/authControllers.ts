import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import * as authService from "../services/authServices";

export async function signup(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  try {
    const data = await authService.signup(body);
    return res.status(HttpStatus.CREATED).json(data);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  try {
    const data = await authService.login(body);
    return res.status(HttpStatus.ACCEPTED).json(data);
  } catch (error) {
    next(error);
  }
}

export async function regenerateToken(req:Request, res:Response, next:NextFunction){
  const refreshToken=req.body.refreshToken;
  try {
    const data=await authService.regenerateToken(refreshToken);
    return res.json(data);
  } catch (error) {
    next(error);
  }
}