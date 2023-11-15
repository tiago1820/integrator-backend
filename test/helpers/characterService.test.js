const CharacterService = require("../../src/services/characterService");

// Mock para axios
jest.mock('axios');
const axios = require('axios');

// describe 1
describe('CharacterService', () => {
    let characterService;

    beforeAll(() => {
        characterService = new CharacterService('http://api.example.com');
    });

    it('deberia crearse correctamente', () => {
        expect(characterService).toBeInstanceOf(CharacterService);
    });

    it('deberia asignar correctamente la URL', () => {
        expect(characterService.URL).toBe('http://api.example.com');
    });
});

// describe 2
describe('getCharacterById', () => {
    let characterService;

    beforeEach(() => {
        characterService = new CharacterService('http://api.example.com');
    });

    it('deberia obtener un personaje por su ID', async () => {
        const characterId = 1;

        // respuesta simulada
        const responseData = {
            data: {
                id: characterId,
                name: 'Rick Sanchez',
                status: 'Alive',
                species: 'Human',
                gender: 'Male',
                origin: {
                    name: 'Earth (C-137)',
                    url: 'http://earthc137.example.com'
                },
                image: 'http://rick.example.com/image.jpg'
            }
        };

        axios.mockResolvedValue(responseData);

        const character = await characterService.getCharacterById(characterId);

        expect(character).toEqual({
            id: characterId,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            origin: {
                name: 'Earth (C-137)',
                url: 'http://earthc137.example.com'
            },
            image: 'http://rick.example.com/image.jpg'
        });
    });

    it('deberia manejar errores al obtener un personaje por su ID', async () => {
        const characterId = 1;

        // simula un error
        axios.mockRejectedValue(new Error('Error al obtener el personaje'));

        await expect(characterService.getCharacterById(characterId)).rejects.toThrow('Error al obtener el personaje');
    });
});

// describe 3
describe('getTotalCharacter', () => {
    let characterService;

    beforeEach(() => {
        characterService = new CharacterService('http://api.example.com');
    });

    it('deberia obtener el total de personajes', async () => {
        const responseData = {
            data: {
                info: {
                    count: 42
                }
            }
        };

        axios.mockResolvedValue(responseData);
        const totalCharacter = await characterService.getTotalCharacter();

        expect(totalCharacter).toBe(42);
    });

    it('deberia manejar errores al obtener el total de personajes', async () => {
        axios.mockRejectedValue(new Error('Error al obtener el total de personajes'));

        await expect(characterService.getTotalCharacter()).rejects.toThrow('Error al obtener el total de personajes')
    });
});