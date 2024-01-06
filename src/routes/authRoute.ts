import { Router } from "express";
import { login, regenerateToken, signup } from "../controllers/authControllers";

const authRouter= Router();

authRouter.post("/signup",signup);
authRouter.post("/login",login);
authRouter.post("/refresh",regenerateToken);

export default authRouter;