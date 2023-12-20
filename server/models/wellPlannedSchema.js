const mongoose = require("mongoose");

const wellPlannedExcelSchema = new mongoose.Schema(
    {
        excelName: { type: String, trim: true, required: true },
        userId: { type: String, trim: true, required: true },
        id: { type: String, trim: true, required: true },
        fieldNumber: { type: String, trim: true, required: true },
        md: { type: Number, trim: true, required: true, index: true }, // Use Number type for numerical values
        inc: { type: Number, trim: true, required: true },
        azi: { type: Number, trim: true, required: true },
        tvd: { type: Number, trim: true, required: true },
        tvdss: { type: Number, trim: true, required: true },
        north: { type: Number, trim: true, required: true },
        east: { type: Number, trim: true, required: true },
        dls: { type: Number, trim: true, required: true },
        toolface: { type: Number, trim: true, required: true },
        buildrate: { type: Number, trim: true, required: true },
        turnrate: { type: Number, trim: true, required: true },
        vs: { type: Number, trim: true, required: true },
        comments: { type: String, trim: true },
    },
    { versionKey: false }
);

const WellPlannedExcelModel = mongoose.model("WellPlannedExcel", wellPlannedExcelSchema);

module.exports = WellPlannedExcelModel;
