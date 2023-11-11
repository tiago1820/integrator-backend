const FavoritesService = require("../helpers/favoriteService");
const { User, Favorite } = require('../DB_connection');


class FavoritesController {
    constructor() {
        this.favoritesService = new FavoritesService();
    }

    getFav = async (req, res) => {
        const userId = parseInt(req.params.userId, 10);
        try {
            const user = await User.findByPk(userId);

            if (user) {
                // Utiliza el método getFavorites para obtener los favoritos del usuario
                const userFavorites = await user.getFavorites();

                return res.status(200).json(userFavorites);
            }
            return res.status(404).json({ message: 'Usuario no encontrado' });

        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    postFav = async (req, res) => {
        const userId = parseInt(req.params.userId, 10);
        const { id, name, origin, status, image, species, gender } = req.body;

        try {
            const user = await User.findByPk(userId);
            if (id && name && status && image && species && gender) {
                const uid = parseInt(id, 10);
                const [newFavorite, created] = await Favorite.findOrCreate({
                    where: { uid, name, origin, status, image, species, gender },
                });

                await user.addFavorite(newFavorite);
                const userFavorites = await user.getFavorites();

                return res.status(201).json(userFavorites);
            }
            return res.status(401).json({ message: 'Faltan datos' });
        } catch (error) {
            console.error('Error al crear o asociar el favorito:', error);
            return res.status(500).json({ message: error });
        }

    }

    deleteFav = async (req, res) => {
        const userId = parseInt(req.params.userId, 10);
        const favoriteId = parseInt(req.params.favoriteId, 10);

        console.log("USERID", userId);
        console.log("FAVORIDID", favoriteId);

        try {
            if (favoriteId) {
                const user = await User.findByPk(userId);

                if (user) {
                    const favoriteToDelete = await Favorite.findByPk(favoriteId);

                    if (favoriteToDelete) {
                        await user.removeFavorite(favoriteToDelete);

                        const userFavorites = await user.getFavorites();

                        return res.status(200).json(userFavorites);
                    } else {
                        return res.status(404).json({ message: 'Favorito no encontrado' });
                    }
                } else {
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }
            } else {
                return res.status(401).json({ message: 'Faltan datos' });
            }
        } catch (error) {
            console.error('Error al eliminar el favorito:', error);
            return res.status(500).json({ message: error });
        }
    }
};

module.exports = FavoritesController;