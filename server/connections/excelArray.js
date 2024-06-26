const constants = require("./constants");

const excelArray = [
    { name: 'well', data: constants.WELL },
    { name: 'wellbore', data: constants.WELLBORE },
    { name: 'planRevision', data: constants.PLANREVSION },
    { name: 'fieldName', data: constants.FIELDNAME },
    { name: 'utm', data: constants.UTM },
    { name: 'northReference', data: constants.NORTHREFERENCE },
    { name: 'magneticDeclination', data: constants.MAGNETICDECLINATION },
    { name: 'convergence', data: constants.CONVERGENCE },
    { name: 'fieldVerticalReference', data: constants.FIELDVERTICALREFERENCE },
    { name: 'rotaryToField', data: constants.ROTARYTOFIELD },
    { name: 'rotarySubsea', data: constants.ROTARYSUBSEA },
    { name: 'rotaryToMHL', data: constants.ROTARYTOMHL },
    { name: 'sectionX', data: constants.SECTIONX },
    { name: 'sectionY', data: constants.SECTIONY },
    { name: 'verticalSectionAzimuth', data: constants.VERTICALSECTIONAZIMUTH },
    { name: 'localNorthSlotLocation', data: constants.LOCALNORTHSLOTLOCATION },
    { name: 'localEastSlotLocation', data: constants.LOCALEASTSLOTLOCATION },
    { name: 'localGridNorthSlotLocation', data: constants.GRIDNORTHSLOTLOCATION },
    { name: 'localGridEastSlotLocation', data: constants.GRIDEASTSLOTLOCATION },
    { name: 'localLongitudeSlotLocation', data: constants.LONGITUDESLOTLOCATION },
    { name: 'localLatitudeSlotLocation', data: constants.LATITUDESLOTLOCATION },
    { name: 'localHorizSlotLocation', data: constants.HORZSLOTLOCATION },
    { name: 'localVertSlotLocation', data: constants.VERTSLOTLOCATION },
    { name: 'localNorthFacilityReferencePt', data: constants.LOCALNORTHFACILITYREFERENCEPOINT },
    { name: 'localEastFacilityReferencePt', data: constants.LOCALEASTFACILITYREFERENCEPOINT },
    { name: 'localGridNorthFacilityReferencePt', data: constants.GRIDNORTHFACILITYREFERENCEPOINT },
    { name: 'localGridEastFacilityReferencePt', data: constants.GRIDEASTFACILITYREFERENCEPOINT },
    { name: 'localLongitudeFacilityReferencePt', data: constants.LONGITUDEFACILITYREFERENCEPOINT },
    { name: 'localLatitudeFacilityReferencePt', data: constants.LATITUDEFACILITYREFERENCEPOINT },
    { name: 'localHorizFacilityReferencePt', data: constants.HORZFACILITYREFERENCEPOINT },
    { name: 'localVertFacilityReferencePt', data: constants.VERTFACILITYREFERENCEPOINT },
    { name: 'localNorthFieldReferencePt', data: constants.LOCALNORTHFIELDREFERENCEPOINT },
    { name: 'localEastFieldReferencePt', data: constants.LOCALEASTFIELDREFERENCEPOINT },
    { name: 'localGridNorthFieldReferencePt', data: constants.GRIDNORTHFIELDREFERENCEPOINT },
    { name: 'localGridEastFieldReferencePt', data: constants.GRIDEASTFIELDREFERENCEPOINT },
    { name: 'localLongitudeFieldReferencePt', data: constants.LONGITUDEFIELDREFERENCEPOINT },
    { name: 'localLatitudeFieldReferencePt', data: constants.LATITUDEFIELDREFERENCEPOINT },
    { name: 'localHorizFieldReferencePt', data: constants.HORZFIELDREFERENCEPOINT },
    { name: 'localVertFieldReferencePt', data: constants.VERTFIELDREFERENCEPOINT },
    { name: 'lastRevised', data: constants.LASTREVISED }
];

module.exports = excelArray