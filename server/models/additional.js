const mongoose = require("mongoose");

const additionalSchema = new mongoose.Schema(
    {
        units: { type: String, trim: true, required: true },
        verticalSectionAzimuth: { type: String, trim: true, required: true },
        surveyReferencePoint: { type: String, trim: true, required: true },
    },
    { versionKey: false }
);
const additional = mongoose.model("additional", additionalSchema);
module.exports = additional;
