import BadRequestError from "../error/badRequestError";
import NotFoundError from "../error/notFoundError";
import { IProfession } from "../interface/profession";
import { IProfile } from "../interface/profile";
import ProfileModel from "../model/profileModel";

export async function getAllProfile(){
  return await ProfileModel.getAllProfile();
}

export async function getProfileFiltered(professionValue:string,locationValue:string){
  return await ProfileModel.getProfileFiltered(professionValue,locationValue);
}

export async function getProfile(userId:number){
  const profile= await ProfileModel.getProfile(userId);
  return profile;
}

export async function createProfile(userId:number,fullName:string,profileData:IProfile,professionData:IProfession){
  //Find profile by id
  const isExistingProfile= await ProfileModel.getProfile(userId);
  if(isExistingProfile){
    throw new BadRequestError("Profile already exist")
  }

  return ProfileModel.createProfile(userId,fullName,profileData,professionData);
}


export async function updateProfile(userId:number,fullName:string,profileData:IProfile,professionData:IProfession){
  //Find profile by id
  const isExistingProfile= await ProfileModel.getProfile(userId);
  if(!isExistingProfile){
    throw new NotFoundError("Profile dont exist")
  }

  const updatedProfile= await ProfileModel.updateProfile(userId,fullName,profileData,professionData);
  return updatedProfile;
}

export async function deleteProfile(userId:number){
  //Find profile by id
  const isExistingProfile= await ProfileModel.getProfile(userId);
  if(!isExistingProfile){
    throw new NotFoundError("Profile dont exist")
  }

  const deletedProfile= await ProfileModel.deleteProfile(userId);
  return deletedProfile;
}