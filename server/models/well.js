const mongoose = require("mongoose");

const wellSchema = new mongoose.Schema(
    {
        Name: { type: String, trim: true, required: true },
        GovernmentID: { type:String , trim: true, default: "N/A"},
        LastRevised: { type: Date, trim: true, required: true , default: Date.now},
    },
    { versionKey: false, timestamps: true }
);
const well = mongoose.model("well", wellSchema);
module.exports = well;
