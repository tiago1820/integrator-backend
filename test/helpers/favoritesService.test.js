const FavoritesService = require("../../src/helpers/favoriteService");

// describe 1
describe('FavoritesService', () => {
    it('deberia crearse correctamente', () => {
        const favoritesService = new FavoritesService();
        expect(favoritesService).toBeInstanceOf(FavoritesService);
    });

    it('deberia tener una lista de favoritos vacía al inicio', () => {
        const favoriteService = new FavoritesService();
        expect(favoriteService.myFavorites).toEqual([]);
    });
});

// Describe 2
describe('FavoritesService', () => {
    let favoriteService;

    beforeEach(() => {
        favoritesService = new FavoritesService();
    });

    it('deberia agregar un personaje a la lista de favoritos', () => {
        const character = {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            origin: {
                name: 'Earth (C-137)',
                url: 'http://earthc137.example.com'
            },
            image: 'http://rick.example.com/image.jpg'
        };

        const updatedFavorites = favoritesService.addFavorite(character);

        expect(updatedFavorites).toEqual([character]);
    });
});

// Describe 3
describe('FavoritesService', () => {
    let favoriteService;

    beforeEach(() => {
        favoriteService = new FavoritesService();
    });

    it('deberia eliminar un personaje de la lista de favoritos', () => {
        const character = {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            origin: {
                name: 'Earth (C-137)',
                url: 'http://earthc137.example.com'
            },
            image: 'http://rick.example.com/image.jpg'
        };
        favoriteService.addFavorite(character);

        const updatedFavorites = favoritesService.deleteFavorite(character.id);

        expect(updatedFavorites).toEqual([]);
    });
});