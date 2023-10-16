const { fetchDataFromAPI, mapCharacterData } = require("../utils/apiUtils");
const getCharById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchDataFromAPI(id);
        const character = mapCharacterData(data);

        return character.name
            ? res.json(character)
            : res.status(404).send("Character not found.");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = getCharById;