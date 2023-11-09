const FavoritesService = require("../helpers/favoriteService");
const { Favorite } = require('../DB_connection');


class FavoritesController {
    constructor() {
        this.favoritesService = new FavoritesService();
    }

    getFav = async (req, res) => {
        try {
            const favs = await Favorite.findAll();
            return res.status(200).json(favs);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    postFav = async (req, res) => {
        let { id, name, origin, status, image, species, gender } = req.body;

        try {
            if (id && name && status && image && species && gender) {
                await Favorite.findOrCreate({
                    where: { uid: id, name, origin, status, image, species, gender }
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

        try {
            if (id) {
                await Favorite.destroy({
                    where: { id }
                });
                const favs = await Favorite.findAll();

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