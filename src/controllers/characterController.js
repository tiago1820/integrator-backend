const CharacterService = require("../services/characterService")

class CharacterController {
    constructor() {
        this.charService = new CharacterService();
    }

    async getCharactersByPage(req, res) {
        try {
            const { page } = req.params;
            const characters = await this.charService.getCharactersByPage(page);
            return res.json(characters);
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