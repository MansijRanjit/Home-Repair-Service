import { IProfession } from "../interface/profession";
import { IProfile } from "../interface/profile";
import BaseModel from "./baseModel";

export default class ProfileModel extends BaseModel {
  static async getAllProfile() {
    return this.queryBuilder()
      .select({
        full_name:"users.fullname",
        profile_id: "profiles.profile_id",
        description: "profiles.description",
        available_time: "profiles.available_time",
        minimum_charge: "profiles.minimum_charge",
        location: "profiles.location",
        contact_number: "profiles.contact_number",
        image:"profiles.image",
        profession_name: "professions.profession_name",
      })
      .from("profiles")
      .innerJoin("professions", "profiles.profile_id", "professions.profile_id")
      .innerJoin("users","users.id","profiles.user_id");
  }

  static async getProfileFiltered(professionValue:string, locationValue:string){
    let query= this.queryBuilder()
    .select({
      full_name:"users.fullname",
      profile_id: "profiles.profile_id",
      description: "profiles.description",
      available_time: "profiles.available_time",
      minimum_charge: "profiles.minimum_charge",
      location: "profiles.location",
      contact_number: "profiles.contact_number",
      image:"profiles.image",
      profession_name: "professions.profession_name",
    })
    .from("profiles")
    .innerJoin("professions", "profiles.profile_id", "professions.profile_id")
    .innerJoin("users","users.id","profiles.user_id");

    if(professionValue!== "all"){
      query=query.where("profession_name","ilike",`%${professionValue}%`);
    }
    if(locationValue!=="all"){
      query=query.where("location","ilike",`%${locationValue}%`);
    }

    const resultData= await query;
    //console.log(resultData);
    
    return resultData;
  }

  static async getProfile(userId: number) {
    return this.queryBuilder()
      .select({
        user_name:"users.username",
        full_name:"users.fullname",
        profile_id: "profiles.profile_id",
        description: "profiles.description",
        available_time: "profiles.available_time",
        minimum_charge: "profiles.minimum_charge",
        location: "profiles.location",
        contact_number: "profiles.contact_number",
        image:"profiles.image",
        profession_name: "professions.profession_name",
      })
      .from("profiles")
      .innerJoin("users","users.id","profiles.user_id")
      .innerJoin("professions", "profiles.profile_id", "professions.profile_id")
      .where("profiles.user_id", userId)
      .first();
  }

  static async createProfile(
    userId:number,
    fullName:string,
    profileData: IProfile,
    professionData: IProfession
  ) {
    return this.queryBuilder().transaction(async (trx) => {
      // Insert into 'profiles' table
      const [profile] = await trx("profiles")
        .insert({
          description: profileData.description,
          available_time: profileData.available_time,
          minimum_charge: profileData.minimum_charge,
          location: profileData.location,
          contact_number: profileData.contact_number,
          user_id: userId,
          image:profileData.image
        })
        .returning("profile_id");

      //console.log(profile,typeof(profile));

      // Insert into 'professions' table
      await trx("professions").insert({
        profession_name: professionData.profession_name,
        profile_id: profile.profileId,
      });

      //Update user table:
      await trx("users").where({id:userId}).update({
        fullname:fullName
      });
    });
  }

  static async updateProfile(
    userId: number,
    fullName:string,
    profileData: IProfile,
    professionData: IProfession
  ) {
    return this.queryBuilder().transaction(async (trx) => {
      //Update user table:
      await trx("users").where({id:userId}).update({
        fullname:fullName
      });

      //Find profile with profile_id associated with the provided user_id
      const [profile] = await trx("profiles")
        .where({ user_id: userId })
        .returning("profile_id");

      //console.log(profile,typeof(profile));

      //Update profiles table:
      await trx("profiles").where({ user_id: userId }).update({
        description: profileData.description,
        available_time: profileData.available_time,
        minimum_charge: profileData.minimum_charge,
        location: profileData.location,
        contact_number: profileData.contact_number,
        image:profileData.image
      });

      //Update professions table based on the retrieved profile_id
      await trx("professions")
        .where({ profile_id: profile.profileId })
        .update({ profession_name: professionData.profession_name });
    });
  }

  static async deleteProfile(userId: number) {
    return this.queryBuilder()
      .table("profiles")
      .where({ user_id: userId })
      .del();
  }
}
