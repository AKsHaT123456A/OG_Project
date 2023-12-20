const mongoose = require("mongoose");

const interpolateSchema = new mongoose.Schema(
    {
        excelName: { type: String, trim: true, required: true },
        userId: { type: String, trim: true, required: true },
        md: { type: String, trim: true, required: true, index: true },
        tvd: { type: String, trim: true, required: true },
        ew: { type: String, trim: true, required: true },
        ns: { type: String, trim: true, required: true },
        rf: { type: String, trim: true, required: true },
        inc: { type: String, trim: true, required: true },
        azi: { type: String, trim: true, required: true }
    },
    { versionKey: false }
);

const interpolate = mongoose.model("interpolate", interpolateSchema);

module.exports = interpolate;
