const express = require("express");
const router = express.Router();

const { validateAuth, validateUpdateSub } = require("../../validation/validation");
const userController = require("../../controllers/users");
const guard = require("../../service/guard");

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    return res.status(429).json({
      status: "error",
      code: 429,
      message: "Too many Requests",
    });
  },
});

router.post("/signup", validateAuth, userController.signup);
router.post("/login", validateAuth, limiter, userController.login);
router.post("/logout", guard, userController.logout);
router.get("/current", guard, userController.currentUser);
router.patch("/", guard, validateUpdateSub, userController.updateSub);

module.exports = router;
