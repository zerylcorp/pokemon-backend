const router = require("express").Router();
const Controller = require("../controllers/user.controller");

router.get("/", (req, res, next) => {
  res.status(200).json({
    status: true,
    message: "Hello Testing User",
  });
});

router.post("/register", Controller.register);
router.post("/login", Controller.login);

module.exports = router;
