import { Request, Response } from "express";
import * as userServices from "../services/userServices"

export async function getUserById(req:any, res:Response){
  try {
    const user=await userServices.getUserById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}