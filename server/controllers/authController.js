const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');

const register = async (req, res) => {
    try {
        const id = uuidv4();
        const userId = req.headers['user-id']; // Use 'user-id' header
        const user = await User.findOne({ id: userId });
        
        console.log({ user, userId });

        if (user) {
            if (!userId) {
                return res.redirect(`https://temp-project-alpha.vercel.app/404`);
            }
            return res.redirect(`https://og-project.onrender.com/api/v1/auth/${userId}`);
        }

        await User.create({
            id
        });

        // Set 'user-id' header in the response
        res.set('user-id', id);
        return res.redirect(`https://og-project.onrender.com/api/v1/auth/${id}`);
    } catch (err) {
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
};

const redirect = (req, res) => {
    const userId = req.headers['user-id']; // Use 'user-id' header

    if (!userId) {
        console.log({ message: "No header found" });
        const fifteenDays = 15 * 24 * 60 * 60 * 1000;

        // Set 'user-id' header in the response
        res.set('user-id', req.params.id);
    }

    console.log({ message: "Header found", header: userId });
    return res.redirect(`https://temp-project-alpha.vercel.app/`);
};

module.exports = { register, redirect };
