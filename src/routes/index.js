const router = require("express").Router();
const GetCharByIdController = require("../controllers/getCharByIdController");
const FavoritesController = require("../controllers/favoritesController");
const AuthController = require("../controllers/authController");

router.get("/character/count", GetCharByIdController.getTotalCharacterCount.bind(GetCharByIdController));
router.get("/character/:id", GetCharByIdController.handle.bind(GetCharByIdController));

router.post("/fav", FavoritesController.postFav.bind(FavoritesController));
router.delete("/fav/:id", FavoritesController.deleteFav.bind(FavoritesController));

router.get("/login", AuthController.login.bind(AuthController));
router.get("/register", AuthController.register.bind(AuthController));
router.get("/recover", AuthController.recoverPassword.bind(AuthController));

module.exports = router;