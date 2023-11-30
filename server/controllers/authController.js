const User  = require("../models/user");
const { v4: uuidv4 } = require('uuid')
const register = async (req, res) => {
    try {
        const id = uuidv4();
        await User.create({
            id
        });

        return res.redirect(`https://og-project.onrender.com/api/v1/auth/${id}`)
    } catch (err) {
        res
            .status(500)
            .json({ message: "Registration failed", error: err.message });
    }
};

const redirect = (req, res) => {
    res.cookie('id', req.params.id);

    res.redirect(`https://temp-project-alpha.vercel.app/`)
}



module.exports = {register,redirect};
