const axios = require("axios");

class RickAndMortyApi {
    constructor(url) {
        this.URL = url;
    }

    getCharacterData = async (id) => {
        try {
            const response = await axios(this.URL + id);
            return response.data;
        } catch (error) {
            throw new Error("Error fetching data from Rick and Morty API");
        }
    }

    mapCharacterData = (data) => {
        const { name, status, species, gender, origin, image } = data;
        const character = { name, status, species, gender, origin, image };
        return character;
    }
}

module.exports = RickAndMortyApi;