const { User } = require("../models/user");
const { v4: uuidv4 } = require('uuid')
const register = async (req, res) => {
    try {
        const id = uuidv4();
        await User.create({
            id
        });

        return res.status(201).json({ message: "Registered", id });
    } catch (err) {
        res
            .status(500)
            .json({ message: "Registration failed", error: err.message });
    }
};



module.exports = register;
