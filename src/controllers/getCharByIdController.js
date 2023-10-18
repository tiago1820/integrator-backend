const RickAndMortyApi = require("../utils/rickAndMortyApi");
const ResponseHandler = require("../utils/responseHandler");
const responseHandler = new ResponseHandler();
const rmApi = new RickAndMortyApi("https://rickandmortyapi.com/api/character/");

class GetCharByIdController {
    handle = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await rmApi.getCharacterData(id);
            const character = rmApi.mapCharacterData(data);
            return character
                ? responseHandler.sendSuccessResponse(res, character)
                : responseHandler.sendErrorResponse(res, 404, "¿Disculpe, personaje no encontrado!");
        } catch (error) {
            return responseHandler.sendErrorResponse(res, 500, error.message);
        }
    }

    getTotalCharacterCount = async (req, res) => {
        try {
            const totalCharacterCount = await rmApi.fetchCharacterCount();
            return responseHandler.sendSuccessResponse(res, { totalCharacterCount });
        } catch (error) {
            return responseHandler.sendErrorResponse(res, 500, error.message);
        }
    }
}

module.exports = new GetCharByIdController();