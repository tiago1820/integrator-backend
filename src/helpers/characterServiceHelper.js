const axios = require('axios');

class CharacterService {
    constructor(URL) {
        this.URL = URL;
    }

    async getCharacterById(id) {
        try {
            const { name, status, species, gender, origin, image } = (await axios(this.URL + id)).data;
            const character = { id, name, status, species, gender, origin, image };

            return character;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = CharacterService;