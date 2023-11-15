const router = require("express").Router();
const CharacterController = require("../controllers/characterController");
// const login = require("../controllers/login");
// const postUser = require('../controllers/postUser');
const AuthController = require('../controllers/authController');
const FavoritesController = require("../controllers/favoritesController");

const authController = new AuthController();
const characterController = new CharacterController();
const favoritesController = new FavoritesController();

// Characters
router.get("/character/page/:page", (req, res) => characterController.getCharactersByPage(req, res));
router.get("/character/total", (req, res) => characterController.getTotalCharacters(req, res));
router.get("/character/:id", (req, res) => characterController.getCharById(req, res));

// Authentication
router.get("/login", (req, res) => authController.login(req, res));
router.post('/register', (req, res) => authController.postUser(req, res));

// Favorites
router.get("/fav/:userId", (req, res) => favoritesController.getFav(req, res));
router.post("/fav/:userId", (req, res) => favoritesController.postFav(req, res));
router.delete("/fav/:userId/:uid", (req, res) => favoritesController.deleteFav(req, res));

module.exports = router;