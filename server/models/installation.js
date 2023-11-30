const mongoose = require("mongoose");

const installationSchema = new mongoose.Schema(
    {
        Name: { type: String, trim: true, required: true },
        Easting:{ type:String, trim: true, required: true},
        Northing:{ type:String, trim: true, required: true},
        MapName:{ type:String, trim: true, required: true},
        NorthAlignment:{ type:String, trim: true, required: true},
    },
    { versionKey: false }
);
const installation = mongoose.model("installation", installationSchema);
module.exports = installation;
