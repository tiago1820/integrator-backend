const axios = require("axios");

const URL = "https://rickandmortyapi.com/api/character/";

const getCharById = (req, res) => {
    const { id } = req.params;
    axios(URL + id)
        .then(({ data }) => {
            const { name, status, species, gender, origin, image } = data;
            const character = { id, name, status, species, gender, origin, image };

            return character.name
                ? res.json(character)
                : res.status(404).send("Character not found.")
        })
        .catch((err) => {
            return res.status(500).send(err.message);
        });
};

module.exports = getCharById;