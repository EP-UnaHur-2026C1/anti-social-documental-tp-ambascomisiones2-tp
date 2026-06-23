const Joi = require("joi");

const userSchema = Joi.object({
  nickName: Joi.string().min(3).max(30).required().messages({
    "string.base": "El nombre de usuario debe ser texto",
    "string.empty": "El nombre de usuario no puede estar vacío",
  }),
  firstName: Joi.string().min(3).max(30).required().messages({
    "string.base": "El nombre debe ser text",
    "string.empty": "El nombre no puede estar vacío",
  }),
  lastName: Joi.string().min(3).max(30).required().messages({
    "string.base": "El apellido debe ser texto",
    "string.empty": "El apellido no puede estar vacío",
  }),
  birthdate: Joi.date().less("now").required().messages({
    "date.less": "La fecha de nacimiento debe ser una fecha pasada",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "El email debe ser una dirección de correo válida",
  }),
});

module.exports = { userSchema };
