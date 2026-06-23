const Post = require("../models/post");
const cache = require("../config/redisClient");

const createComment = async (req, res) => {
  try {
    const { postId, text, author } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });

    post.comments.push({ text, author });
    await post.save();

    if (cache.isReady) {
      await cache.del();
      await cache.del("post:all");
    }
    res.status(201).json({ message: "Comentario agregado con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear el comentario", error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });

    if (cache.isReady) {
      await cache.del(`post:${postId}`);
      await cache.del("posts:all");
    }
    return res.status(200).json({ message: "Comentario eliminado con éxito" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el comentario",
      error: error.message,
    });
  }
};

module.exports = { createComment, deleteComment };
