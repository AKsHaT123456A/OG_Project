const mongoose = require("mongoose");

const wellboreSchema = new mongoose.Schema(
    {
        Name: { type: String, trim: true, required: true },
        Created: { type: Date, trim: true, required: true , default: Date.now},
        LastRevised: { type: Date, trim: true, required: true , default: Date.now},
    },
    { versionKey: false, timestamps: true }
);
const wellbore = mongoose.model("wellbore", wellboreSchema);
module.exports = wellbore;
