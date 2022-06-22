const router = require("express").Router();
const listController = require("../controller/list.controller");
const { isAuthenticated } = require("../utils/auth");

router.route("/").get(isAuthenticated, listController.list);
router.route("/:listId").get(isAuthenticated, listController.show);
router.route("/").post(isAuthenticated, listController.create);
router.route("/:listId").delete(isAuthenticated, listController.destroy);

module.exports = router;
