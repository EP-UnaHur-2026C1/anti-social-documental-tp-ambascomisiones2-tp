const { post } = require("../models");

const validatePostExists = async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundPost = await post.findById(id);

        if (!foundPost) {
            return res.status(404).json({ error: "Post no encontrado" });
        }
        req.foundPost = foundPost;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error al validar el post", error: error.message });
    }
};

module.exports = validatePostExists;