const { User } = require('../DB_connection');

class AuthController {
    async login(req, res) {
        const { password, email } = req.query;

        try {
            if (email && password) {
                const foundUser = await User.findOne({
                    where: { email }
                });
                if (!foundUser) return res.status(404).json({ message: 'Usuario no encontrado' });
                if (foundUser.password !== password) return res.status(403).json({ message: 'Contraseña incorrecta' });
                return res.status(200).json({ user: foundUser, access: true });
            }
            return res.status(400).json({ message: 'Faltan datos' });
        } catch (error) {
            console.log("AQUI: ", error);
            return res.status(500).json({ message: error });
        }
    }

    async postUser(req, res) {
        const { email, password } = req.body;
        try {
            if (email && password) {
                const [newUser] = await User.findOrCreate({
                    where: { email, password }
                });
                return res.status(201).json({ user: newUser, access: true })
            }
            return res.status(400).json({ message: 'Faltan datos' });
        } catch (error) {
            return res.status(500).json({ message: error });
        }

    }
}

module.exports = AuthController;