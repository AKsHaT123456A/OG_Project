const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        id: { type: String, trim: true, required: true },
        wells: [{ type: mongoose.Schema.Types.ObjectId, ref: 'well', default: [] }],
        wellbores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'wellbore', default: [] }],
        fields: [{ type: mongoose.Schema.Types.ObjectId, ref: 'field', default: [] }],
        slots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'slot', default: [] }],
        additionals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'additional', default: [] }],
        installations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'installation', default: [] }],
        surveys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'survey', default: [] }],
        logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'log', default: [] }],
    },
    { versionKey: false }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
