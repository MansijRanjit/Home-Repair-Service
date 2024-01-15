import { Router } from "express";
import {auth} from "../middleware/auth"
import { createProfile, deleteProfile, getAllProfile, getProfile, updateProfile, getProfileFiltered } from "../controllers/profileControllers";
import { validateReqBody } from "../middleware/validator";
import { createProfileSchema } from "../schema/profileSchema";
import multer from "multer";

const profileRouter = Router();

const storage = multer.diskStorage({
  destination: function (req,file,cb){
    return cb(null,"src/uploads")
  },
  filename:function (req,file,cb){
    return cb(null,`${Date.now()}-${file.originalname}`)
  }
})
const upload= multer({storage:storage});

profileRouter.get("/all",getAllProfile);
profileRouter.get("/all/:searchData",getProfileFiltered)
profileRouter.get("/",auth,getProfile);
profileRouter.post("/",auth,upload.single("image"),createProfile);
profileRouter.put("/",auth,upload.single("image"),updateProfile);
//profileRouter.post("/",auth,validateReqBody(createProfileSchema),createProfile);
//profileRouter.put("/",auth,validateReqBody(createProfileSchema),updateProfile);
profileRouter.delete("/",auth,deleteProfile);

export default profileRouter;