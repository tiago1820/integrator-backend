const FavoritesService = require("../services/favoriteService");
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
                const userFavorites = await user.getFavorites();

                return res.status(200).json(userFavorites);
            }
            return res.status(404).json({ message: 'Usuario no encontrado' });

        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    postFav = async (req, res) => {
        const userId = req.params.userId;
        const { uid, name, origin, status, image, species, gender } = req.body;

        try {
            const user = await User.findByPk(userId);
            if (uid && name && origin && status && image && species && gender) {

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
        const uid = parseInt(req.params.uid, 10);

        console.log("userId", typeof userId);
        console.log("uid", typeof uid);

        try {
            if (!uid) {
                return res.status(400).json({ message: 'El parámetro uid es requerido' });
            }

            const user = await User.findByPk(userId);
            console.log("Usuario encontrado:", user);


            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            const favoriteToDelete = await Favorite.findOne({ where: { uid } });
            console.log("Favorito encontrado:", favoriteToDelete);



            if (!favoriteToDelete) {
                return res.status(404).json({ message: 'Favorito no encontrado' });
            }


            await user.removeFavorite(favoriteToDelete);
            console.log("Favorito eliminado");



            const userFavorites = await user.getFavorites();

            return res.status(200).json(userFavorites);



        } catch (error) {
            console.error('Error al eliminar el favorito:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};

module.exports = FavoritesController;
