const router = require("express").Router();
const CharacterController = require("../controllers/characterController");
const login = require("../controllers/login");
const FavoritesController = require("../controllers/favoritesController");

const characterController = new CharacterController();
const favoritesController = new FavoritesController();

// Characters
router.get("/character/total", (req, res) => characterController.getTotalCharacters(req, res));
router.get("/character/:id", (req, res) => characterController.getCharById(req, res));
router.get("/characters", (req, res) => characterController.getAllCharacters(req, res));

// Authentication
router.get("/login", login);

// Favorites
router.post("/fav", (req, res) => favoritesController.postFav(req, res));
router.delete("/fav/:id", (req, res) => favoritesController.deleteFav(req, res));

module.exports = router;