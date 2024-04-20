const router = require("express").Router();
const Controller = require("../controllers/pokemon.controller");
const { authentication } = require("../middlewares/authHandler");

router.get("/", Controller.getAll);
router.get("/my-list", authentication, Controller.getAllMyPokemon);
router.post("/catch", authentication, Controller.catch);
router.patch("/release/:pokemonId", authentication, Controller.release);
router.patch("/rename/:pokemonId", authentication, Controller.rename);
router.get("/detail/:pokemonId", Controller.getPokemonDetail);

module.exports = router;
