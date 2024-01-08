import { IProfession } from "../interface/profession";
import { IProfile } from "../interface/profile";
import BaseModel from "./baseModel";

export default class ProfileModel extends BaseModel {
  static async getAllProfile() {
    return this.queryBuilder()
      .select({
        profile_id: "profiles.profile_id",
        description: "profiles.description",
        available_time: "profiles.available_time",
        minimum_charge: "profiles.minimum_charge",
        location: "profiles.location",
        contact_number: "profiles.contact_number",
        profession_name: "professions.profession_name",
      })
      .from("profiles")
      .leftJoin("professions", "profiles.profile_id", "professions.profile_id");
  }

  static async getProfile(user_id: number) {
    return this.queryBuilder()
      .select({
        profile_id: "profiles.profile_id",
        description: "profiles.description",
        available_time: "profiles.available_time",
        minimum_charge: "profiles.minimum_charge",
        location: "profiles.location",
        contact_number: "profiles.contact_number",
        profession_name: "professions.profession_name",
      })
      .from("profiles")
      .leftJoin("professions", "profiles.profile_id", "professions.profile_id")
      .where("profiles.user_id", user_id)
      .first();
  }

  static async createProfile(
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
          user_id: profileData.user_id,
        })
        .returning("profile_id");

      //console.log(profile,typeof(profile));

      // Insert into 'professions' table
      await trx("professions").insert({
        profession_name: professionData.profession_name,
        profile_id: profile.profileId,
      });
    });
  }

  static async updateProfile(
    userId: number,
    profileData: IProfile,
    professionData: IProfession
  ) {
    return this.queryBuilder().transaction(async (trx) => {
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
