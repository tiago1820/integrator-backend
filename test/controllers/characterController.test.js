const CharacterController = require('../../src/controllers/characterController');
const CharacterService = require('../../src/services/characterService');

jest.mock('../../src/services/characterService.js');

describe('CharacterController', () => {
    it('debe crear una instancia de CharacterController', () => {
        const controller = new CharacterController();
        expect(controller).toBeInstanceOf(CharacterController);
    });

    it('deberia obtener el personaje por el ID', async () => {
        CharacterService.prototype.getCharacterById = jest.fn().mockResolvedValue({
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            origin: 'Earth',
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        });

        const controller = new CharacterController();

        const req = { params: { id: '1' } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await controller.getCharById(req, res);

        expect(res.json).toHaveBeenCalledWith({
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            origin: 'Earth',
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        });

    });

    it('deberia obtener el total de personajes', async () => {
        CharacterService.prototype.getTotalCharacter = jest.fn().mockResolvedValue(42);

        const controller = new CharacterController();
        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await controller.getTotalCharacters(req, res);
        expect(res.json).toHaveBeenCalledWith({ total: 42 });

    });
});