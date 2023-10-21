class FavoritesService {
    constructor() {
        this.myFavorites = [];
    }

    addFavorite(character) {
        this.myFavorites.push(character);
        return this.myFavorites;
    }

    deleteFavorite(id) {
        this.myFavorites = this.myFavorites.filter(char => char.id !== id);
        return this.myFavorites;
    }

}

module.exports = FavoritesService;