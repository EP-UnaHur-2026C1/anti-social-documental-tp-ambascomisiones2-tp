const Post = require("../models/post");
const fs = require("fs");
const path = require("path");
const cache = require("../config/redisClient");

const createImage = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No se subio ninguna imagen." });

    const { postId } = req.body;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Post no encontrado" });

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    post.images.push({ imageUrl });
    await post.save();

    if (cache.isReady) {
      await cache.del(`post:${postId}`);
      await cache.del("posts:all");
    }
    res.status(201).json({ message: "Image subida exitosamente", imageUrl });
  } catch (error) {
    res
      .status(500)
      .json({ message: " Error al subir la imagen.", error: error.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { postId, imageId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });

    const image = await post.images.id(imageId);
    if (!image)
      return res
        .status(404)
        .json({ message: "Imagen no encontrada en este post" });

    const filename = path.basename(image.imageUrl);
    const filePath = path.join(__dirname, "..", "public", "uploads", filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    post.images.pull({ _id: imageId });
    await post.save();

    if (cache.isReady) {
      await cache.del(`post:${postId}`);
      await cache.del("posts:all");
    }
    res.status(200).json({ message: "Imagen eliminada correctamente." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar la imagen.", error: error.message });
  }
};

module.exports = { createImage, deleteImage };
