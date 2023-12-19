const mongoose = require("mongoose");

const tieOnPointSchema = new mongoose.Schema(
    {
        excelName:{type:String,trim:true,default:''},
        md: { type: Number, trim: true, required: true },
        cl: { type: Number, trim: true, default: 0 },
        inc: { type: Number, trim: true, required: true },
        azi: { type: Number, trim: true, required: true },
        tvd: { type: Number, trim: true, default: 0 },
        ns: { type: Number, trim: true, default: 0 },
        ew: { type: Number, trim: true, default: 0 },
        vs: { type: Number, trim: true, default: 0 },
        dls: { type: Number, trim: true, default: 0 },
        userId: { type: String, trim: true, default: '' }
    },
    { versionKey: false }
);

const tieOnPoint = mongoose.model("tieOnPoint", tieOnPointSchema);
module.exports = tieOnPoint;
