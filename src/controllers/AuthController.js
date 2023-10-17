const { FirebaseAuthenticator } = require('../utils/firebaseAuthenticator');
const ResponseHandler = require("../utils/responseHandler");

class AuthController {
    constructor() {
        this.firebaseAuth = new FirebaseAuthenticator();
        this.responseHandler = new ResponseHandler();

    }

    async login(req, res) {
        try {
            const { email: userEmail, password: userPass } = req.query;
            const currentUser = await this.firebaseAuth.authenticateUser(userEmail, userPass);
            return this.responseHandler.sendSuccessResponse(res, { currentUser });
        } catch (error) {
            return this.responseHandler.sendErrorResponse(res, 500, "Error al autenticar usuario");
        }
    }

    async register(req, res) {
        try {
            const { email: userEmail, password: userPass } = req.query;
            const currentUser = await this.firebaseAuth.createUser(userEmail, userPass);
            return this.responseHandler.sendSuccessResponse(res, { currentUser });
        } catch (error) {
            return this.responseHandler.sendErrorResponse(res, 500, "Error al registrar usuario");
        }
    }

    async recoverPassword(req, res) {
        try {
            const { email: userEmail } = req.query;
            await this.firebaseAuth.newPassword(userEmail);
            return this.responseHandler.sendSuccessResponse(res, "Email enviado con éxito.");
        } catch (error) {
            console.error(error);
            return this.responseHandler.sendErrorResponse(res, 500, `Error al enviar el correo electronico: ${error.message}`)
        }
    }
}

module.exports = new AuthController();