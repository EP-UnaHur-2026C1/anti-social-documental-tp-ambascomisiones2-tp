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

module.exports = router;
