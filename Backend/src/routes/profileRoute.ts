import { Router } from "express";
import {auth} from "../middleware/auth"
import { createProfile, deleteProfile, getAllProfile, getProfile, updateProfile, getProfileFiltered } from "../controllers/profileControllers";

const profileRouter = Router();

profileRouter.get("/all",getAllProfile);
profileRouter.get("/all/:searchData",getProfileFiltered)
profileRouter.get("/",auth,getProfile);
profileRouter.post("/",auth,createProfile);
profileRouter.put("/",auth,updateProfile);
profileRouter.delete("/",auth,deleteProfile);

export default profileRouter;