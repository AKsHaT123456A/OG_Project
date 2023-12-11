const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema(
    {
<<<<<<< HEAD
        excelName:{ type: String, trim: true, required: true },
=======
        excelName: { type: String, trim: true, required: true },
>>>>>>> 8b4ab4a084e4903db8f166c39c2a128f71612467
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
<<<<<<< HEAD
        userId: { type: String, trim: true, default: '' }
=======
        userId: { type: String, trim: true, default: '' },
>>>>>>> 8b4ab4a084e4903db8f166c39c2a128f71612467
    },
    { versionKey: false }
);

const detail = mongoose.model("detail", detailSchema);

module.exports = detail;
