import Joi from "joi";

export const newAdminSchema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name should have at least {#limit} characters",
        "string.max": "Name should not exceed {#limit} characters",
    }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email address",
        }),

    role: Joi.string().valid("admin", "super_admin").default("admin").messages({
        "any.only": "Role must be one of user, admin, or editor",
    }),

    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(
            new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])")
        )
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least {#limit} characters long",
            "string.max": "Password must not exceed {#limit} characters",
            "string.pattern.base":
                "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
        }),
});
