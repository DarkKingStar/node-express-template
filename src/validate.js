import Joi from 'joi';
const VALIDATE = {
    USERLOGIN:{
        body: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
            .required()
            .messages({
                "string.pattern.base": "Password must contain at least one symbol, one uppercase letter, one lowercase letter, and one number.",
                "string.min": "Password must be at least 6 characters long."
            }),
        }),
    },
};
export default VALIDATE;