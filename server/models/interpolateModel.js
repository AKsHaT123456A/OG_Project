const mongoose = require("mongoose");

const interpolateSchema = new mongoose.Schema(
    {
        excelName: { type: String, trim: true, required: true },
        userId: { type: String, trim: true, required: true },
        md: { type: Number, trim: true, required: true },
        tvd: { type: Number, trim: true, required: true },
        ew: { type: Number, trim: true, required: true },
        ns: { type: Number, trim: true, required: true },
        rf: { type: Number, trim: true, required: true },
        inc: { type: Number, trim: true, required: true },
        azi: { type: Number, trim: true, required: true }
    },
    { versionKey: false }
);

const interpolate = mongoose.model("interpolate", interpolateSchema);

module.exports = interpolate;
