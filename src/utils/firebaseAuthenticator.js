const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } = require("firebase/auth");
const firebase = require("../firebase/firebase");
const ResponseHandler = require("./responseHandler");
const responseHandler = new ResponseHandler();

class FirebaseAuthenticator {
    constructor() {
        this.auth = getAuth(firebase);
    }

    authenticateUser = async (userEmail, userPass) => {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, userEmail, userPass);
            const { uid, email } = userCredential.user;
            return { uid, email };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    createUser = async (userEmail, userPass) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, userEmail, userPass);
            const { uid, email } = userCredential.user;
            return { uid, email };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    newPassword = async (userEmail) => {
        try {
            await sendPasswordResetEmail(this.auth, userEmail);
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = { FirebaseAuthenticator };