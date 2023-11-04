const CharacterService = require("../helpers/characterService")

class CharacterController {
    constructor() {
        this.charService = new CharacterService("https://rickandmortyapi.com/api/character/");
    }

    getAllCharacters = async (req, res) => {
        try {
            const characters = await this.charService.getAllCharacters();
            return res.status(200).json(characters);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    async getCharById(req, res) {
        try {
            const { id } = req.params;
            const character = await this.charService.getCharacterById(id);

            return character.name
                ? res.json(character)
                : res.status(404).send("Character not found.");
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    async getTotalCharacters(req, res) {
        try {
            const totalCharacters = await this.charService.getTotalCharacter();

            return res.status(200).json({ total: totalCharacters });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
}

module.exports = CharacterController;