const { comment } = require("../models");

const validateCommentExists = async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundComment = await comment.findById(id);
        if (!foundComment) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }

        req.foundComment = foundComment;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error al validar el comentario", error: error.message });
    }
};

module.exports = validateCommentExists;