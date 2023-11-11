const FavoritesService = require("../helpers/favoriteService");
const { User, Favorite } = require('../DB_connection');


class FavoritesController {
    constructor() {
        this.favoritesService = new FavoritesService();
    }

    getFav = async (req, res) => {
        try {
            const userId = 1;
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
        let { id, name, origin, status, image, species, gender } = req.body;

        try {
            id = String(id);
            const userId = 1;
            const user = await User.findByPk(userId);



            if (id && name && status && image && species && gender) {
                const [newFavorite, created] = await Favorite.findOrCreate({
                    where: { uid: id, name, origin, status, image, species, gender },
                });
                // const favs = await Favorite.findAll();
                //
                await user.addFavorite(newFavorite);
                const userFavorites = await user.getFavorites();

                console.log(userFavorites)
                return res.status(201).json(userFavorites);
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
                const userId = 1;
                const user = await User.findByPk(userId);

                if (user) {
                    const favoriteToDelete = await Favorite.findByPk(id);

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
            return res.status(500).json({ message: error });
        }
    }
};

module.exports = FavoritesController;