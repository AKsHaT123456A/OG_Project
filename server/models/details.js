const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema(
    {
        excelName: { type: String, trim: true, required: true },
        well: { type: String, trim: true, unique: true },
        wellbore: { type: String, trim: true },
        planRevision: { type: String, trim: true },
        fieldName: { type: String, trim: true },
        utm: { type: String, trim: true },
        northReference: { type: String, trim: true },
        magneticDeclination: { type: String, trim: true },
        convergence: { type: String, trim: true },
        fieldVerticalReference: { type: String, trim: true },
        rotaryToField: { type: String, trim: true },
        rotarySubsea: { type: String, trim: true },
        rotaryToMHL: { type: String, trim: true },
        sectionX: { type: String, trim: true },
        sectionY: { type: String, trim: true },
        verticalSectionAzimuth: { type: String, trim: true },
        userId: { type: String, trim: true, default: '' },
    },
    { versionKey: false }
);

const detail = mongoose.model("detail", detailSchema);

module.exports = detail;
