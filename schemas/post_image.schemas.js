const Joi = require("joi");

const postImageSchema = Joi.object({
  imageUrl: Joi.string().uri().required().messages({
    "string.base": "La URL de la imagen debe ser texto",
    "string.empty": "La URL de la imagen no puede estar vacía",
    "string.uri": "La URL de la imagen debe ser una URL válida",
  }),
  postId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.base": "El ID del post debe ser una cadena de texto",
    "string.pattern.base": "El ID del post debe ser un ObjectId válido de MongoDB (24 caracteres hexadecimales)",
  }),
});

module.exports = { postImageSchema };