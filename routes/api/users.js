const express = require("express");
const router = express.Router();

const { validateAuth, validateUpdateSub } = require("../../validation/validation");
const userController = require("../../controllers/users");
const guard = require("../../service/guard");

router.post("/signup", validateAuth, userController.signup);
router.post("/login", validateAuth, userController.login);
router.post("/logout", guard, userController.logout);
router.get("/current", guard, userController.currentUser);
router.patch("/", guard, validateUpdateSub, userController.updateSub);

module.exports = router;
