const router = require("express").Router();
const auth = require("../middleware/auth");
const { signup, login, refreshToken } = require("../controller/user/auth");
const { getUsers,  deleteUser } = require("../controller/user/user");
const {  isAdmin, isAdminOrUser } = require("../middleware/uservalidater");


router
  .route("/")
  .get(auth, isAdmin, getUsers)

router
  .route("/:_id")
  .get(auth, isAdminOrUser, getUsers)
  .delete(auth, isAdminOrUser, deleteUser);

//forget password
router.route("/fp/:email").get(getUsers)
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/refreshToken").post(refreshToken);

module.exports = router;
