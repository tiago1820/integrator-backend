const axios = require('axios');

class CharacterService {
    constructor(URL) {
        this.URL = URL;
    }

    async getCharactersByPage(page) {
        try {
            const response = await axios(`${this.URL}?page=${page}`);
            return response.data.results;
        } catch (error) {
            throw new Error(error.message);
        }
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

    async getTotalCharacter() {
        try {
            const response = await axios(this.URL);
            return Number(response.data.info.count);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = CharacterService;