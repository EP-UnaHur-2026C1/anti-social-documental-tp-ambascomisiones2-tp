const { Router } = require("express");
const router = Router();
const postController = require("../controllers/post.controllers");
const validatePost = require("../middlewares/validatePost");
const validatePostExists = require("../middlewares/validatePostExists");
const checkCachePost = require("../middlewares/checkCachePost");

router.get("/", postController.getAllPosts);
router.get(
  "/:id",
  checkCachePost,
  validatePostExists,
  postController.getPostById,
);
router.post("/", validatePost, postController.createPost);
router.post("/:id/tags", validatePostExists, postController.associateTagToPost);
router.delete("/:id", validatePostExists, postController.deletePost);
router.put("/:postId",validatePost,validatePostExists, postController.editPost) //Capaz se puede agregar que valide que el mismo author que creo el comentario seae el que quiere editarlo

module.exports = router;
