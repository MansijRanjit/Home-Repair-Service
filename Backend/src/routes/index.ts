import {Router} from "express";
import authRouter from "./authRoute";
import profileRouter from "./profileRoute";
import userRouter from "./userRoute";

const router = Router();

router.use("/auth",authRouter);
router.use("/profile",profileRouter);
router.use("/user",userRouter);

export default router;