const router = require("express").Router();
const getCharById = require("../controllers/getCharById");
const { postFav, deleteFav } = require("../controllers/handleFavorites");
const AuthController = require("../controllers/AuthController");

router.get("/character/:id", getCharById);
router.post("/fav", postFav);
router.delete("/fav/:id", deleteFav);

router.get("/login", AuthController.login.bind(AuthController));
router.get("/register", AuthController.register.bind(AuthController));
router.get("/recover", AuthController.recoverPassword.bind(AuthController));

module.exports = router;