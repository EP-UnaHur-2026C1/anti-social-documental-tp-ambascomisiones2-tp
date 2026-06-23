const Tag = require("../models/tag");

const createTag = async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    (res.status(201).json(newTag));
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear etiqueta", error: error.message });
  }
};

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find({});
    res.status(201).json(tags);
  } catch (error) {
    res.status(500).json({
      message: "Error al obetener las etiquetas",
      error: error.message,
    });
  }
};

module.exports = { createTag, getAllTags };
