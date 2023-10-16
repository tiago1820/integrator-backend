const { authenticateUser, handleLoginResponse, handleLoginError } = require('../utils/authUtils');

const login = async (req, res) => {
    const { email:userEmail, password:userPass } = req.query;
    try {
        const currentUser = await authenticateUser(userEmail, userPass);
        return handleLoginResponse(res, currentUser);
    } catch (error) {
        return handleLoginError(res, error);
    }
};

module.exports = login;