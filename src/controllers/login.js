// const users = require("../utils/users");
// Firebase
const firebase = require("../firebase/firebase");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const axios = require("axios");
const login = async (req, res) => {
    const auth = getAuth(firebase);
    const { email, password } = req.query;
    let access = false;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("USUARIO", user.email);

        access = true;

        return res.json({ access });
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }

    // users.forEach((user) => {
    //     if (user.email === email && user.password === password) {
    //         access = true;
    //     }
    // });
};

module.exports = login;