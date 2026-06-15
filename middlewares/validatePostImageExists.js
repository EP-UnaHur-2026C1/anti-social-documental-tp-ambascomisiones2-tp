const { post_image } = require("../models");

const validatePostImageExists = async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundImage = await post_image.findById(id);

        if (!foundImage) {
            return res.status(404).json({ error: "Imagen no encontrada" });
        }

        req.foundImage = foundImage;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error al validar la imagen", error: error.message });
    }
};

module.exports = validatePostImageExists;