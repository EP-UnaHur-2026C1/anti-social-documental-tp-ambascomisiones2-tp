const { Router } = require("express");
const router = Router();
const uploadPostImage = require("../middlewares/upload");
const validatePostImageExists = require("../middlewares/validatePostImageExists");
const postImageController = require("../controllers/post_image.controllers");
 
// Para crear la imagen pasamos el postId en el body del Form-Data
router.post(
  "/",
  uploadPostImage.single("image"),
  postImageController.createImage,
);
 
router.get("/:postId", postImageController.getImagesByPost);
 
router.delete(
  "/:postId/:imageId",
  validatePostImageExists,
  postImageController.deleteImage,
);
 
module.exports = router;