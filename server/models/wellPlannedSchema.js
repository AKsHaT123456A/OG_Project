const mongoose = require("mongoose");

const wellPannedExcelSchema = new mongoose.Schema(
    {
        excelName:{ type :String , trim:true,required:true},
        userId:{ type :String , trim:true,required:true},
        id: { type: String, trim: true, required: true },
        fieldNumber: { type: String, trim: true, required: true },
        md: { type: String, trim: true, required: true },
        inc: { type: String, trim: true, required: true },
        azi: { type: String, trim: true, required: true },
        tvd: { type: String, trim: true, required: true },
        tvdss: { type: String, trim: true, required: true },
        north: { type: String, trim: true, required: true },
        east: { type: String, trim: true, required: true },
        dls: { type: String, trim: true, required: true },
        toolface: { type: String, trim: true, required: true },
        buildrate: { type: String, trim: true, required: true },
        turnrate: { type: String, trim: true, required: true },
        vs: { type: String, trim: true, required: true },
        comments: { type: String, trim: true, required: true },
    },
    { versionKey: false }
);

const WellPannedExcelModel = mongoose.model("WellPannedExcel", wellPannedExcelSchema);

module.exports = WellPannedExcelModel;
