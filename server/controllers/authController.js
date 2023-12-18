const User = require("../models/user");
const { v4: uuidv4 } = require('uuid')
const register = async (req, res) => {
    try {
        const id = uuidv4();
        const userId = req.cookies.userId;
        const user = await User.findOne({ id: userId });
        console.log({ user , userId });
        if (user) {
            if (!userId) {
                return res.redirect(`https://temp-project-alpha.vercel.app/404`);
            }
            return res.redirect(`https://og-project.onrender.com/api/v1/auth/${userId}`);
        }
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
    if (!req.cookies.userId) {
        console.log({ message: "No cookie found" });
        const fifteenDays = 15 * 24 * 60 * 60 * 1000;
        res.cookie('userId', req.params.id, { maxAge: fifteenDays, httpOnly: true });
    }
    console.log({ message: "Cookie found", cookie: req.cookies.userId });
    return res.redirect(`https://temp-project-alpha.vercel.app/`)
}



module.exports = { register, redirect };
//setup ,remove created 