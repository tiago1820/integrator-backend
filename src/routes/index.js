const router = require("express").Router();
const CharacterController = require("../controllers/characterController");
const login = require("../controllers/login");
const { postFav, deleteFav } = require("../controllers/handleFavorites");

router.get("/character/:id", (req, res) => CharacterController.getCharById(req, res));

router.get("/login", login);
router.post("/fav", postFav);
router.delete("/fav/:id", deleteFav);

module.exports = router;