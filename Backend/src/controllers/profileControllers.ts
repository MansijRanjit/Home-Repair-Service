import { Request,Response } from "express";
import * as profileServices from "../services/profileServices"

export async function getAllProfile(_req:Request,res:Response){
  try {
    const profiles= await profileServices.getAllProfile();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getProfileFiltered(req:Request,res:Response){
  const result= req.params.searchData;
  const filterArray= result.split(',').map(String);
  const professionValue = filterArray[0];
  const locationValue = filterArray[1];
  
  try {
    const profiles= await profileServices.getProfileFiltered(professionValue,locationValue);
    res.json(profiles);
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}

export async function getProfile(req:any, res:Response){
  try {
    const profile = await profileServices.getProfile(req.user.id);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function createProfile(req:any,res:Response){
  try {
    const user=req.user;    

    const profileData={
      description:req.body.description,
      available_time:req.body.available_time,
      minimum_charge:req.body.minimum_charge,
      location:req.body.location,
      contact_number:req.body.contact_number,
    }

    const professionData={
      profession_name:req.body.profession_name
    }

    const newProfile = await profileServices.createProfile(user.id,profileData,professionData);
    res.json({message:"New User Created succcefflly"});
  } catch (error) {
    //console.error('Error in creatingprofile',error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function updateProfile(req:any, res:Response){
  try {
    const user=req.user;

    const fullName=req.body.full_name;

    const profileData={
      description:req.body.description,
      available_time:req.body.available_time,
      minimum_charge:req.body.minimum_charge,
      location:req.body.location,
      contact_number:req.body.contact_number,
    }

    const professionData={
      profession_name:req.body.profession_name
    }

    const updatedProfile = await profileServices.updateProfile(user.id,fullName,profileData,professionData);
    res.json({message:"Profile updated successfully"});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function deleteProfile(req:any, res:Response){
  try {
    const user = req.user;

    const deletedProfile= await profileServices.deleteProfile(user.id);
    res.json({message:"Profile deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}