const router = require("express").Router();
const Controller = require("../controllers/pokemon.controller");
const { authentication } = require("../middlewares/authHandler");

router.get("/", Controller.getAll);
router.post("/catch", authentication, Controller.catch);
router.patch("/release/:pokemonId", authentication, Controller.release);
router.patch("/rename/:pokemonId", authentication, Controller.rename);

module.exports = router;
