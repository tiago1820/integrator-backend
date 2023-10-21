const FavoritesService = require("../helpers/favoriteService");

class FavoritesController {
    constructor() {
        this.favoritesService = new FavoritesService();
    }

    postFav(req, res) {
        try {
            const { body } = req;
            const favorites = this.favoritesService.addFavorite(body);
            return res.json(favorites);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    deleteFav(req, res) {
        try {
            const { id } = req.params;
            const favorites = this.favoritesService.deleteFavorite(id);
            return res.json(favorites);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
}

module.exports = FavoritesController;