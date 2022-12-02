const router = require("express").Router();
const auth = require("../middleware/auth");
const { createPost, getPost,  deletePost, } = require("../controller/post/post");
const { isAdminOrUser, isUser } = require("../middleware/uservalidater");

router
  .route("/")
  .get(auth, isAdminOrUser, getPost)
  .post(auth, isUser, createPost)

router
  .route("/:userID")
  .get(auth, isUser, getPost)

router
  .route("/:userID/:_id")
  .get(auth, isUser, getPost)
  .delete(auth, isAdminOrUser, deletePost);

module.exports = router;
