const mongoose = require("mongoose");

const tieOnPointSchema = new mongoose.Schema(
    {
        userId: { type: String, trim: true, required: true },
        tieOnPoint: { type: String, trim: true, default: "193.60" },
        excelName: { type: String, trim: true, required: true },
    },
    { versionKey: false }
);

const tieOnPoint = mongoose.model("tieOnPoint", tieOnPointSchema);
module.exports = tieOnPoint;
