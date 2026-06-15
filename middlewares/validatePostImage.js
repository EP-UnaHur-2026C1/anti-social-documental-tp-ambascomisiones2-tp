const Joi = require('joi');

const schema = Joi.object({
  postId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.pattern.base': '"postId" debe ser un ObjectId válido de MongoDB.'
  })
});

const validatePostImage = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Datos inválidos para la imagen del post.",
      details: error.details.map(e => e.message)
    });
  }
  next();
};

module.exports = validatePostImage;