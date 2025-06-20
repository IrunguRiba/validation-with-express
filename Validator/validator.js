const Joi = require('joi');

// Reusable validator function
const validator = (schema) => (payload) => 
    schema.validate(payload, { abortEarly: false });

// Signup schema
const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(10).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    address:{
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zip: Joi.string().pattern(/^[0-9]{5}$/).required()
    },
    DOB:{
        day: Joi.number().integer().min(1).max(31).required(),
        month: Joi.number().integer().min(1).max(12).required(),
        year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required()
    },
    referred:Joi.boolean().optional(),
    referredBy:Joi.string().optional().allow('').when("reffered", {
        is:true,
        then: Joi.string().required().min(3).max(50),
        otherwise: Joi.string().optional().allow(''),
    }),
    hobbies:Joi.array().items(Joi.string().min(3).max(30)).optional().default([]),
    acceptTAS: Joi.boolean().truthy("Yes").valid(true).required(),
});

// Export the validator bound to the schema
exports.validateSignup = validator(signupSchema);
