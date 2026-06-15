const {Router} = require("express");
const router = Router();
const commentController = require("../controllers/comment.controllers");
const validateComments = require("../middlewares/validateComment");
const validateCommentExists = require("../middlewares/validateCommentExists");

router.post("/", validateComments, commentController.createComment);
router.delete("/:id", validateCommentExists, commentController.deleteComment);

module.exports = router;