import { Request,Response } from "express";
import * as profileServices from "../services/profileServices"
import HttpStatus from "http-status-codes";
import { IProfile } from "../interface/profile";
import { IProfession } from "../interface/profession";

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

    const fullName=req.body.full_name;

    const profileData:IProfile={
      description:req.body.description,
      available_time:req.body.available_time,
      minimum_charge:req.body.minimum_charge,
      location:req.body.location,
      contact_number:req.body.contact_number,
    }
    if(req.file){
      profileData.image=req.file.path;
    }else{
      profileData.image="src/uploads/default.png";
    }

    const professionData:IProfession={
      profession_name:req.body.profession_name
    }
  
    await profileServices.createProfile(user.id,fullName,profileData,professionData);
    res.status(HttpStatus.CREATED).json({message:"New User Created succcefflly"});
  } catch (error) {
    console.error('Error in creatingprofile',error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function updateProfile(req:any, res:Response){
  try {
    const user=req.user;

    const fullName=req.body.full_name;

    const profileData:IProfile={
      description:req.body.description,
      available_time:req.body.available_time,
      minimum_charge:req.body.minimum_charge,
      location:req.body.location,
      contact_number:req.body.contact_number,
    }
    if(req.file){
      profileData.image=req.file.path;
    }
    
    const professionData:IProfession={
      profession_name:req.body.profession_name
    }

    await profileServices.updateProfile(user.id,fullName,profileData,professionData);
    res.json({message:"Profile updated successfully"});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function deleteProfile(req:any, res:Response){
  try {
    const user = req.user;

    await profileServices.deleteProfile(user.id);
    res.json({message:"Profile deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}