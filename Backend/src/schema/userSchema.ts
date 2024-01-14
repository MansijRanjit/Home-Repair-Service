import Joi from "joi";

export const createUserSchema = Joi.object({
  fullname:Joi.string().required().min(5).max(255).messages({
    "any.required": "Full Name is required",
    "string.empty": "Full Name cannot be empty",
    "string.min": "Full Name should have at least 5 characters",
    "string.base": "Full Name should be string",
  }),
  username: Joi.string().required().min(4).max(255).messages({
    "any.required": "Username is required",
    "string.empty": "Username cannot be empty",
    "string.min": "Username should have at least 4 characters",
    "string.base": "Username should be string",
  }),
  email:Joi.string().email().required().max(255).messages({
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty",
    "string.base": "Email should be string",
  }),
  password: Joi.string().required().min(6).max(255).messages({
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
    "string.min": "Password should have at least 6 characters",
    "string.base": "Password should be string",
  })
})

export const loginSchema = Joi.object({
  username: Joi.string().required().min(4).max(255).messages({
    "any.required": "Username is required",
    "string.empty": "Username cannot be empty",
    "string.min": "Username should have at least 4 characters",
    "string.base": "Username should be string",
  }),
  password: Joi.string().required().min(6).max(255).messages({
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
    "string.min": "Password should have at least 6 characters",
    "string.base": "Password should be string",
  })
})