import Joi from "joi";

export const createUserSchema = Joi.object({
  username: Joi.string().required().min(4).max(255),
  email:Joi.string().email().required().max(255),
  password: Joi.string().required().min(6).max(255)
})

export const loginSchema = Joi.object({
  username: Joi.string().required().min(4).max(255),
  password: Joi.string().required().min(6).max(255)
})