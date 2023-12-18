const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');

const register = async (req, res) => {
    try {
        const id = uuidv4();
        const userId = req.cookies.id;
        const user = await User.findOne({ id: userId });

        if (user) {
            return res.redirect(`https://og-project.onrender.com/api/v1/auth/${userId}`);
        }

        await User.create({ id });
        return res.redirect(`https://og-project.onrender.com/api/v1/auth/${id}`);
    } catch (err) {
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
};

const redirect = (req, res) => {
    // Always set the cookie, regardless of whether it exists
    const fifteenDays = 15 * 24 * 60 * 60 * 1000;
    res.cookie('id', req.params.id, { maxAge: fifteenDays, httpOnly: true });

    console.log({ message: "Cookie found", cookie: req.cookies.id });
    return res.redirect(`https://temp-project-alpha.vercel.app/`);
};

module.exports = { register, redirect };
