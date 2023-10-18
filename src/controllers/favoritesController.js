const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert("serviceAccountKey.json")
});

class FavoritesController {
    constructor() {
        this.myFavorites = [];
    }

    getFavs = (req, res) => {
        admin.firestore().collection("favorites").get()
            .then(snapshot => {
                const favorites = [];
                snapshot.forEach(doc => {
                    const favorite = doc.data();
                    favorite.uid = doc.id;
                    console.log("UIA", favorite);
                    favorites.push(favorite);
                });
                return res.json(favorites);
            })
            .catch(error => {
                console.error('Error al obtener los favoritos: ', error);
                return res.status(500).json({ success: false, error: error.message });
            });
    };

    postFav = (req, res) => {
        const {uid, id, name, status, species, gender, origin, image } = req.body;
        const newFavorite = {uid, id, name, status, species, gender, origin, image };

        admin.firestore().collection("favorites").add(newFavorite)
            .then(docRef => {
                console.log("Favorito añadido con ID: ", docRef.id);
                return this.getFavs(req, res);
            })
            .catch(error => {
                console.error('Error al agregar el favorito: ', error);
                return res.status(500).json({ success: false, error: error.message });
            });

    };

    deleteFav = (req, res) => {
        const { id } = req.params;

        admin.firestore().collection("favorites").doc(id).delete()
            .then(() => {
                console.log(`Favorito con ID ${id} eliminado`);
                res.set('Cache-Control', 'no-store');
                return this.getFavs(req, res);
            })
            .catch(error => {
                console.log(`Error al eliminar el favorito con ID ${id}:`, error);
                return res.status(500).json({ success: false, error: error.message });
            })

    };
}

module.exports = new FavoritesController();