const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert("serviceAccountKey.json")
});

class FavoritesController {
    constructor() {
        this.myFavorites = [];
    }

    getFavs = (req, res) => {
        const userId = req.query.userId;

        admin.firestore().collection("favorites")
            .where("userId", "==", userId)
            .get()
            .then(snapshot => {
                const favorites = [];
                snapshot.forEach(doc => {
                    const favorite = doc.data();
                    favorite.uid = doc.id;
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
        const { id, name, status, species, gender, origin, image, userId } = req.body;
        const newFavorite = { id, name, status, species, gender, origin, image, userId };

        if (req.body.hasOwnProperty('uid') && req.body.uid !== undefined) {
            newFavorite.uid = req.body.uid;
        }


        admin.firestore().collection("favorites").add(newFavorite)
            .then(docRef => {
                return res.json({ success: true });
            })
            .catch(error => {
                console.error('Error al agregar el favorito: ', error);
                return res.status(500).json({ success: false, error: error.message });
            });

    };

    deleteFav = (req, res) => {
        const { id } = req.params;
        const { userId } = req.body;

        console.log("USERIDDELETEFAV", userId);

        admin.firestore().collection("favorites").doc(id).get()
            .then(doc => {
                if (doc.exists) {
                    const favorite = doc.data();
                    if (favorite.userId === userId) {
                        admin.firestore().collection("favorites").doc(id).delete()
                            .then(() => {
                                res.set('Cache-Control', 'no-store');
                            })
                            .catch(error => {
                                return res.status(500).json({ success: false, error: error.message });
                            });
                    } else {
                        return res.status(403).json({ success: false, error: "No tienes permiso para eliminar este favorito." });
                    }
                } else {
                    return res.status(404).json({ success: false, error: "El favorito no existe." });
                }
            })
            .catch(error => {
                console.error('Error al obtener el favorito: ', error);
                return res.status(500).json({ success: false, error: error.message });
            });
    };


    // deleteFav = (req, res) => {
    //     const { id } = req.params;
    //     const {userId} = req.body;

    //     console.log("USERIDDELETEFAV", userId);

    //     admin.firestore().collection("favorites").doc(id).delete()
    //         .then(() => {
    //             res.set('Cache-Control', 'no-store');
    //             return this.getFavs(req, res);
    //         })
    //         .catch(error => {
    //             return res.status(500).json({ success: false, error: error.message });
    //         })

    // };
}

module.exports = new FavoritesController();