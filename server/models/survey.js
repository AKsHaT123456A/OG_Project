const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
    {
        MDft: { type: String, trim: true, required: true },
        Incdeg:{ type:String, trim: true, required: true},
        Azideg:{ type:String, trim: true, required: true},
        TVD:{ type:String, trim: true, required: true},
        Northft:{ type:String, trim: true, required: true},
        Eastft:{ type:String, trim: true, required: true},
        Doglegdegdeg100ft:{ type:String, trim: true, required: true},
        VerticalSection:{ type:String, trim: true, required: true},
        rf:{ type:String, trim: true, required: true},
    },
    { versionKey: false }
);
const survey = mongoose.model("survey", surveySchema);
module.exports = survey;
