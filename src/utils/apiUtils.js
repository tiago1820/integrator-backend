const axios = require("axios");

const URL = "https://rickandmortyapi.com/api/character/";

const fetchDataFromAPI = async (id) => {
    try {
        const response = await axios(URL + id);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching data from API");
    }
};

const mapCharacterData = (data) => {
    const { name, status, species, gender, origin, image } = data;
    const character = { name, status, species, gender, origin, image };
    return character;
};

module.exports = { fetchDataFromAPI, mapCharacterData };