const CharacterService = require("../helpers/characterServiceHelper")

class CharacterController {
    constructor() {
        this.charService = new CharacterService("https://rickandmortyapi.com/api/character/");
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
}

module.exports = new CharacterController();





// const axios = require('axios');

// const URL = "https://rickandmortyapi.com/api/character/";

// const getCharById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, status, species, gender, origin, image } = (await axios(URL + id)).data;
//         const character = { id, name, status, species, gender, origin, image };

//         return character.name
//             ? res.json(character)
//             : res.status(404).send("Character not found.");


//     } catch (error) {
//         return res.status(500).send(error.message);
//     }

// };

// module.exports = getCharById;




