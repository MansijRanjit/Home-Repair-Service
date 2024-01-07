import { Router } from "express";
import { login, regenerateToken, signup } from "../controllers/authControllers";
import { validateReqBody } from "../middleware/validator";
import { createUserSchema, loginSchema } from "../schema/userSchema";

const authRouter= Router();

authRouter.post("/signup",validateReqBody(createUserSchema),signup);
authRouter.post("/login",validateReqBody(loginSchema),login);
authRouter.post("/refresh",regenerateToken);

export default authRouter;