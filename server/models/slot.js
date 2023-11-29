const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
    {
        Name: { type: String, trim: true, required: true },
        GridNorthing:{ type:String, trim: true, required: true},
        GridEasting:{ type:String, trim: true, required: true},
        Latitude:{ type:String, trim: true, required: true},
        Longitude:{ type:String, trim: true, required: true},
        North:{ type:String, trim: true, required: true},
        East:{ type:String, trim: true, required: true},
    },
    { versionKey: false, timestamps: true }
);
const slot = mongoose.model("slot", slotSchema);
module.exports = slot;
