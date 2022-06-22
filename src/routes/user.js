const router = require("express").Router();
const { route } = require("express/lib/application");
const userController = require("../controller/user.controller");

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

module.exports = router;
