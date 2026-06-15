const { Router } = require("express");
const router = Router();

const uploadPostImage = require("../middlewares/uploadPostImage");
const validatePostImage = require("../middlewares/validatePostImage");
const validatePostImageExists = require("../middlewares/validatePostImageExists");
const postImageController = require("../controllers/post_image.controllers");


router.post("/", uploadPostImage.single('image'), validatePostImage, postImageController.createImage);
router.delete("/:id", validatePostImageExists, postImageController.deleteImage);

module.exports = router;