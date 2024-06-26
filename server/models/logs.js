const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
    {
        logName: { type: String, trim: true, required: true },
        excelName: { type: String, trim: true, required: true },
        usedBy: { type: Number, trim: true, required: true },
        usedFrom: { type: Number, trim: true, default: 0 },
        surveys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'survey', default: [] }],
        model:{ type :String, required: true },
        error:{ type: String, required: true },
        userId: { type: String, trim: true, default: '' }
    },
    { versionKey: false }
);
const log = mongoose.model("log", logSchema);
module.exports = log;
