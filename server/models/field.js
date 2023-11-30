const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema(
    {
        Name: { type: String, trim: true, required: true },
        Easting:{ type:String, trim: true, required: true},
        Northing:{ type:String, trim: true, required: true},
        MapName:{ type:String, trim: true, required: true},
        NorthAlignment:{ type:String, trim: true, required: true},
    },
    { versionKey: false }
);
const field = mongoose.model("field", fieldSchema);
module.exports = field;
