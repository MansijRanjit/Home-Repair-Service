import {Router} from "express";
import authRouter from "./authRoute";
import profileRouter from "./profileRoute";

const router = Router();

router.use("/auth",authRouter);
router.use("/profile",profileRouter);

export default router;