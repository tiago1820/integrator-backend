const FavoritesService = require("../helpers/favoriteService");
const { Favorite } = require('../DB_connection');


class FavoritesController {
    constructor() {
        this.favoritesService = new FavoritesService();
    }

    postFav = async (req, res) => {
        let { name, origin, status, image, species, gender } = req.body;

        try {
            if (name && status && image && species && gender) {
                await Favorite.findOrCreate({
                    where: { name, origin, status, image, species, gender }
                });
                const favs = await Favorite.findAll();
                //
                //User.addFavorite(favs);
                return res.status(201).json(favs);
            }
            return res.status(401).json({ message: 'Faltan datos' });
        } catch (error) {
            return res.status(500).json({ message: error });
        }

    }

    deleteFav = async (req, res) => {
        let { id } = req.params;
        console.log('Mi id', id);

        try {
            if (id) {
                await Favorite.destroy({
                    where: { id }
                });
                const favs = await Favorite.findAll();
                console.log("FAVS", favs);

                // User.addFavorite(favs);
                return res.status(201).json(favs);
            }
            return res.status(401).json({ message: 'Faltan datos' });
        } catch (error) {
            return res.status(500).json({ message: error });
        }

    }
};

module.exports = FavoritesController;