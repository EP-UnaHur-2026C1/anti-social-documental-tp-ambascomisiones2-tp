const { Router } = require("express");
const router = Router();
const commentController = require("../controllers/comment.controllers");
const validateComment = require("../middlewares/validateComment");
const validateCommentExists = require("../middlewares/validateCommentExists");

router.post("/", validateComment, commentController.createComment);

router.delete(
  "/:idComment",
  validateCommentExists,
  commentController.deleteComment,
);

router.put(
  "/:idComment",
  validateComment,
  validateCommentExists,
  commentController.editComment,
);

module.exports = router;
