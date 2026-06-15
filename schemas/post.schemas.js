const Joi = require("joi");

const postSchema = Joi.object({
  description: Joi.string().min(3).max(100).required().messages({
    "string.base": "La descripción debe ser texto",
    "string.empty": "La descripción no puede estar vacía",
  }),
  createDate: Joi.date().less("now").required().messages({
    "date.less": "La fecha de creación debe ser una fecha pasada",
  }),
  nickName: Joi.string().min(3).max(30).required().messages({
      "string.base": "El nombre de usuario debe ser texto",
      "string.empty": "El nombre de usuario no puede estar vacío",
  }),
});

module.exports = {postSchema};