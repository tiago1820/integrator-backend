const router = require("express").Router();
const CharacterController = require("../controllers/characterController");
const login = require("../controllers/login");
const { postFav, deleteFav } = require("../controllers/handleFavorites");

// Characters
router.get("/character/total", (req, res) => CharacterController.getTotalCharacters(req, res));
router.get("/character/:id", (req, res) => CharacterController.getCharById(req, res));

// Authentication
router.get("/login", login);

// Favorites
router.post("/fav", postFav);
router.delete("/fav/:id", deleteFav);

module.exports = router;