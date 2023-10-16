const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const firebase = require("../firebase/firebase");

const authenticateUser = async (userEmail, userPass) => {
    const auth = getAuth(firebase);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPass);
        const { uid, email } = userCredential.user;
        console.log("HOLA", email);

        return { uid, email };
    } catch (err) {
        throw new Error(err.message);
    }
};

const handleLoginResponse = (res, currentUser) => {
    return res.json({ currentUser });
};

const handleLoginError = (res, error) => {
    console.error(error);
    return res.status(500).send("Usuario o contraseña incorrecto");
};

module.exports = { authenticateUser, handleLoginResponse, handleLoginError };