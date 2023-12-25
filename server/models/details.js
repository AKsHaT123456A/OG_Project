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
        localNorthSlotLocation: { type: String, trim: true,default:'0' },
        localEastSlotLocation: { type: String, trim: true ,default:'0'},
        localGridNorthSlotLocation: { type: String, trim: true ,default:'0'},
        localGridEastSlotLocation: { type: String, trim: true,default:'0' },
        localLongitudeSlotLocation: { type: String, trim: true,default:'0' },
        localLatitudeSlotLocation: { type: String, trim: true,default:'0' },
        localHorizSlotLocation: { type: String, trim: true ,default:'0'},
        localVertSlotLocation: { type: String, trim: true, default:'0'},
        localNorthFacilityReferencePt: { type: String, trim: true ,default:'0'},
        localEastFacilityReferencePt: { type: String, trim: true ,default:'0'},
        localGridNorthFacilityReferencePt: { type: String, trim: true ,default:'0'},
        localGridEastFacilityReferencePt: { type: String, trim: true ,default:'0'},
        localLongitudeFacilityReferencePt: { type: String, trim: true ,default:'0'},
        localLatitudeFacilityReferencePt: { type: String, trim: true ,default:'0'},
        localHorizFacilityReferencePt: { type: String, trim: true ,default:'0'},
        localVertFacilityReferencePt: { type: String, trim: true ,default:'0'},
        localNorthFieldReferencePt: { type: String, trim: true ,default:'0'},
        localEastFieldReferencePt: { type: String, trim: true ,default:'0'},
        localGridNorthFieldReferencePt: { type: String, trim: true ,default:'0'},
        localGridEastFieldReferencePt: { type: String, trim: true ,default:'0'},
        localLongitudeFieldReferencePt: { type: String, trim: true ,default:'0'},
        localLatitudeFieldReferencePt: { type: String, trim: true ,default:'0'},
        localHorizFieldReferencePt: { type: String, trim: true ,default:'0'},
        localVertFieldReferencePt: { type: String, trim: true ,default:'0'},
        lastRevised:{ type: String, trim: true,default:'0'}
        

    },
    { versionKey: false }
);

const detail = mongoose.model("detail", detailSchema);

module.exports = detail;
