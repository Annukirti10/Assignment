import * as Joi from 'joi'

const querySchema = Joi.object({
    email : Joi.string().max(40).min(4).empty().required().pattern(new RegExp('^[a-z0-9+_.-]+@[a-z0-9.-]+$')).trim(),
    password : Joi.string().trim().required().min(3),
    cpassword : Joi.string().trim().required().min(3),
    fname : Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$')),
    lname : Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$')),
    dob : Joi.date().required().max(Date.now()),
    city : Joi.string().empty().required(),
    state : Joi.string().empty().required(),
    phoneNumber : Joi.number()
})

export default querySchema