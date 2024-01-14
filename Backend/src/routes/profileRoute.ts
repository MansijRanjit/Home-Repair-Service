import { Router } from "express";
import {auth} from "../middleware/auth"
import { createProfile, deleteProfile, getAllProfile, getProfile, updateProfile, getProfileFiltered } from "../controllers/profileControllers";
import { validateReqBody } from "../middleware/validator";
import { createProfileSchema } from "../schema/profileSchema";

const profileRouter = Router();

profileRouter.get("/all",getAllProfile);
profileRouter.get("/all/:searchData",getProfileFiltered)
profileRouter.get("/",auth,getProfile);
profileRouter.post("/",auth,validateReqBody(createProfileSchema),createProfile);
profileRouter.put("/",auth,validateReqBody(createProfileSchema),updateProfile);
profileRouter.delete("/",auth,deleteProfile);

export default profileRouter;