
const mongoose = require("mongoose");
const constants = require("./constants");
const connectDB = async () => {
    mongoose
        .connect(
            process.env.DATABASE_KEY || constants.DATABASE_KEY,
        )
        .then(() => {
            console.log("Successfully connected to mongodb database");
        })
        .catch((err) => {
            console.log(err);
        })
}
module.exports = connectDB;