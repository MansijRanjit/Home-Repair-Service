import { Router } from "express";
import { getUserById } from "../controllers/userController";
import { auth } from "../middleware/auth";

const userRouter=Router();

userRouter.get("/",auth,getUserById)

export default userRouter;