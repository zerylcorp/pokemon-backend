const router = require("express").Router();
const pokemon = require('./pokemon.router')

router.get("/", (req, res, next) => {
  res.status(200).json({
    status: true,
    message: "Hello World",
  });
});

router.use('/pokemon',pokemon)

module.exports = router;
