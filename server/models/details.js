const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema(
    {
        excelName: { type: String, trim: true, required: true },
        well: { type: String, trim: true },
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
        userId: { type: String, trim: true, default: '' },
        localNorthSlotLocation: { type: String, trim: true },
        localEastSlotLocation: { type: String, trim: true },
        localGridNorthSlotLocation: { type: String, trim: true },
        localGridEastSlotLocation: { type: String, trim: true },
        localLongitudeSlotLocation: { type: String, trim: true },
        localLatitudeSlotLocation: { type: String, trim: true },
        localHorizSlotLocation: { type: String, trim: true },
        localVertSlotLocation: { type: String, trim: true },
        localNorthFacilityReferencePt: { type: String, trim: true },
        localEastFacilityReferencePt: { type: String, trim: true },
        localGridNorthFacilityReferencePt: { type: String, trim: true },
        localGridEastFacilityReferencePt: { type: String, trim: true },
        localLongitudeFacilityReferencePt: { type: String, trim: true },
        localLatitudeFacilityReferencePt: { type: String, trim: true },
        localHorizFacilityReferencePt: { type: String, trim: true },
        localVertFacilityReferencePt: { type: String, trim: true },
        localNorthFieldReferencePt: { type: String, trim: true },
        localEastFieldReferencePt: { type: String, trim: true },
        localGridNorthFieldReferencePt: { type: String, trim: true },
        localGridEastFieldReferencePt: { type: String, trim: true },
        localLongitudeFieldReferencePt: { type: String, trim: true },
        localLatitudeFieldReferencePt: { type: String, trim: true },
        localHorizFieldReferencePt: { type: String, trim: true },
        localVertFieldReferencePt: { type: String, trim: true },
        lastRevised:{ type: String, trim: true}
        

    },
    { versionKey: false }
);

const detail = mongoose.model("detail", detailSchema);

module.exports = detail;
