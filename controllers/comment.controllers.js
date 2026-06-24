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
      await cache.del(`post:${postId}`);
      await cache.del("posts:all");
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
    const {idComment} = req.params
    const { postId } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });

    post.comments.pull({ _id: idComment });
    await post.save();
    
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


const editComment = async (req,res) =>{
  try {
    const { idComment } = req.params;
    const {postId, text } = req.body;

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, "comments._id": idComment },
      { $set: { "comments.$.text": text } },
      { new: true }
    );

    if (cache.isReady) {
      await cache.del(`post:${postId}`);
      await cache.del("posts:all");
    }

    res.status(200).json({ message: "Comentario editado con éxito", post: updatedPost });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Error al editar el comentario", error: error.message });
  }
}

const getCommentById = async (req, res) => {
  try {
    const { idComment } = req.params;
    const { postId } = req.query;
 
    const post = await Post.findById(postId).populate("comments.author", "nickName");
    if (!post) return res.status(404).json({ message: "Post no encontrado" });
 
    const comment = post.comments.id(idComment);
    if (!comment) return res.status(404).json({ message: "Comentario no encontrado" });
 
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el comentario", error: error.message });
  }
};

module.exports = { createComment, deleteComment, editComment, getCommentById  };