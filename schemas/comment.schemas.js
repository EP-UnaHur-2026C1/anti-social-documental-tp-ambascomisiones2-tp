const Joi = require("joi");

const commentSchema = Joi.object({
  text: Joi.string().min(1).max(500).required().messages({
    'string.base': 'El texto del comentario debe ser texto',
    'string.empty': 'El texto del comentario no puede estar vacío',
    'string.min': 'El texto del comentario no puede tener menos de 1 carácter',
    'string.max': 'El texto del comentario no puede tener más de 500 caracteres',
  }),
  createDate: Joi.date().required().messages({
    'date.base': 'La fecha de creación del comentario debe ser una fecha',
    'date.empty': 'La fecha de creación del comentario no puede estar vacía',
  }),
  visible: Joi.boolean().required().messages({
    'boolean.base': 'La visibilidad del comentario debe ser un valor booleano',
    'boolean.empty': 'La visibilidad del comentario no puede estar vacía',
  }),
  nickName: Joi.string().min(3).max(30).required().messages({
      "string.base": "El nombre de usuario debe ser texto",
      "string.empty": "El nombre de usuario no puede estar vacío",
  }),
  postId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.base': 'El ID del post debe ser una cadena de texto',
    'string.pattern.base': 'El ID del post debe ser un ObjectId válido de MongoDB (24 caracteres hexadecimales)',
  }),
});

module.exports = { commentSchema };