const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
    {
        fieldNumber: { type: 'String', trim: true, required: true },
        md: { type: String, trim: true, required: true },
        cl: { type: String, trim: true, default: "" },
        inc: { type: String, trim: true, required: true },
        azi: { type: String, trim: true, required: true },
        tvd: { type: Number, trim: true, default: "" },
        ns: { type: Number, trim: true, default: "" },
        ew: { type: Number, trim: true, default: "" },
        dl: { type: String, trim: true, default: "" },
        vs: { type: String, trim: true, default: "" },
        rf: { type: String, trim: true, default: "" },
        dls: { type: String, trim: true, default: "" },
    },
    { versionKey: false }
);
const survey = mongoose.model("survey", surveySchema);
module.exports = survey;
