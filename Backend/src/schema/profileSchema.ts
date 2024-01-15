import Joi from "joi";

export const createProfileSchema = Joi.object({
  full_name:Joi.string().required().min(5).max(255).messages({
    "any.required": "Full Name is required",
    "string.empty": "Full Name cannot be empty",
    "string.min": "Full Name should have at least 5 characters",
    "string.base": "Full Name should be string",
  }),
  profession_name:Joi.string().required().min(4).max(255).messages({
    "any.required": "Profession is required",
    "string.empty": "Profession cannot be empty",
    "string.min": "Profession should have at least 4 characters",
    "string.base": "Profession should be string",
  }),
  image:Joi.string().min(4).max(255).messages({
    "string.min": "Image should have at least 4 characters",
    "string.base": "Image should be string",
  }),
  available_time:Joi.string().required().min(4).max(255).messages({
    "any.required": "Available Time is required",
    "string.empty": "Available Time cannot be empty",
    "string.min": "Available Time should have at least 4 characters",
    "string.base": "Available Time should be string",
  }),
  minimum_charge:Joi.string().required().max(255).messages({
    "any.required": "Minimum Charge is required",
    "string.empty": "Minimum Charge cannot be empty",
    "string.base": "Minimum Charge should be string",
  }),
  location:Joi.string().required().min(4).max(255).messages({
    "any.required": "Location is required",
    "string.empty": "Location cannot be empty",
    "string.min": "Location should have at least 4 characters",
    "string.base": "Location should be string",
  }),
  contact_number:Joi.string().required().min(7).max(255).messages({
    "any.required": "Contact Number is required",
    "string.empty": "Contact Number cannot be empty",
    "string.min": "Contact Number should have at least 7 characters",
    "string.base": "Contact Number should be string",
  }),
  description:Joi.string().required().min(5).max(255).messages({
    "any.required": "Description is required",
    "string.empty": "Description cannot be empty",
    "string.min": "Description should have at least 5 characters",
    "string.base": "Description should be string",
  }),
});
