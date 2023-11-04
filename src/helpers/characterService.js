const axios = require('axios');

class CharacterService {
    constructor(URL) {
        this.URL = URL;
    }

    getAllCharacters = async () => {
        try {
            let characters = [];
            let nextPage = this.URL;

            while (nextPage) {
                const response = await axios(nextPage);
                characters = characters.concat(response.data.results);
                nextPage = response.data.info.next;
            }

            return characters.map(character => {
                const { id, name, status, species, gender, origin, image } = character;
                return { id, name, status, species, gender, origin, image };
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCharacterById(id) {
        try {
            const { name, status, species, gender, origin, image } = (await axios(this.URL + id)).data;
            const character = { id, name, status, species, gender, origin, image };
            console.log("HOLA", character);
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