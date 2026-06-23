const { Router } = require("express");
const router = Router();
const commentController = require("../controllers/comment.controllers");
const validateComment = require("../middlewares/validateComment");
const validateCommentExists = require("../middlewares/validateCommentExists");

router.post("/", validateComment, commentController.createComment);

router.delete(
  "/:postId/:commentId",
  validateCommentExists,
  commentController.deleteComment,
);

module.exports = router;
