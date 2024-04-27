const { get } = require('axios');
const { RM_API_CHARACTER } = require("../constants/index");

class CharacterService {

    async getCharactersByPage(page) {
        try {
            const response = await get(`${RM_API_CHARACTER}?page=${page}`);
            return response.data.results;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCharacterById(id) {
        try {
            const { name, status, species, gender, origin, image } = (await get(RM_API_CHARACTER + id)).data;
            const character = { id, name, status, species, gender, origin, image };
            return character;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getTotalCharacter() {
        try {
            const response = await get(RM_API_CHARACTER);
            return Number(response.data.info.count);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = CharacterService;