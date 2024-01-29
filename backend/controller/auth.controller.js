const jwt = require('jsonwebtoken')
const connection = require('../config/db')

module.exports = {
    createUser: async (req, res) => {
        const data = req.body;
        try {
            connection.query(
                "SELECT * FROM `id_card_information` WHERE id_number = ?",
                [data.id_number],
                (err, result, field) => {
                    if (result.length > 0) {
                        return res.status(400).send({ message: "Already exists" });
                    }
                    connection.query(
                        "INSERT INTO `id_card_information`(`first_name`, `last_name`, `id_number`, `date_of_birth`, `gender`, `address`) VALUES (?,?,?,?,?,?)",
                        [data.first_name, data.last_name, data.id_number, data.date_of_birth, data.gender, data.address],
                        (err, result, field) => {
                            if (err) {
                                console.log("Error inserting a new user");
                                return res.status(400).send({ message: "Error inserting a new user" });
                            }
                            return res.status(201).send({ message: "New user created successfully!!" });
                        }
                    );
                }
            );
        } catch (e) {
            console.log(e);
            return res.status(500).send({ message: e.message });
        }
    },

    login: (req, res) => {
        const user = req.body;
        try {
            connection.query('SELECT * FROM id_card_information WHERE id_number=?', [user.id_number], (err, result, field) => {
                if (err) {
                    res.status(400).send({ message: "Error login" });
                }
                if (!result.length > 0) {
                    res.status(404).send({ message: "Not found user" });
                } else {
                    const token = jwt.sign({ id: result[0].id },process.env.JWT_SEC, { expiresIn: '3d' });
                    res.status(200).json({ user: result[0], token });
                }
            });
        } catch (e) {
            res.status(500).send({ message: "Login error" });
        }
    }
}