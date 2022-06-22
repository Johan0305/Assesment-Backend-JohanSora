const router = require("express").Router();
const favController = require("../controller/fav.controller");
const { isAuthenticated } = require("../utils/auth");

router.route("/:listId").post(isAuthenticated, favController.create);

module.exports = router;
