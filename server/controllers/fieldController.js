const xlsx = require("xlsx");
const additional = require("../models/additional");
const field = require("../models/field");
const installation = require("../models/installation");
const slot = require("../models/slot");
const well = require("../models/well");
const wellbore = require("../models/wellbore");
const { parseExcelData, parseCompleteExcelData } = require("../utils/parseUtil");
const constants = require("../connections/constants");
const detail = require("../models/details");
const parseConstants = require("../connections/parseConstants");
const WellPannedExcelModel = require("../models/wellPlannedSchema");

const fieldController = async (req, res) => {
    try {
        // const id = "d80defd4-3398-4745-8c03-8e0f6825afc3";
        // const { id } = req.cookies;
        const id = req.cookies.id;
        console.log({ id });
        console.log({ od: req.headers });
        const { excelName } = req.query;
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
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
            { name: 'userId', data: constants.PORT },
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
        const excelArray1 = { name: 'parsing', data: parseConstants.PARSING }

        const sheetName = workbook.SheetNames[0];

        const arra = await Promise.all(excelArray.map(async (element) => {
            const parsedData = await parseExcelData(workbook.Sheets[sheetName], element);
            return parsedData;
        }));
        const paredItems = parseCompleteExcelData(workbook.Sheets[sheetName], excelArray1, excelName, id);
        const mergedObject = Object.assign({}, ...arra);
        for (const key in mergedObject) {
            if (mergedObject.hasOwnProperty(key) && mergedObject[key] === undefined) {
                mergedObject[key] = '';
            }
        }
        console.log(mergedObject);
        const newMerge = await detail.findOne({ well: mergedObject.well });

        if (newMerge) {
            return res.status(200).json({ message: "Details already exists", newField: newMerge });
        }
        const newField = await detail.create({ ...mergedObject, excelName, userId: id });
        return res.status(201).json({ message: "Details added", newField });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
const getAllFields = async (req, res) => {
    try {
        // const id = "d80defd4-3398-4745-8c03-8e0f6825afc3";
        const { id } = req.cookies;
        const { excelName } = req.query;
        const details = await detail.findOne({ excelName, userId: id });
        console.log({ details });
        return res.status(200).json({
            message: "Send All Details",
            details
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const getAllWellStructuredData = async (req, res) => {
    try {
        const { excelName } = req.query;
        // const id = "d80defd4-3398-4745-8c03-8e0f6825afc3";
        const { id } = req.cookies;
        const plan = await WellPannedExcelModel.find({ excelName, userId: id });
        return res.status(200).json({ plan });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const updateFields = async (req, res) => {
    try {
        const { excelName } = req.query;
        // const id = "d80defd4-3398-4745-8c03-8e0f6825afc3";
        const { id } = req.cookies;
        const newField = await detail.findOneAndUpdate({ excelName, userId: id }, { ...req.body });
        return res.status(200).json({ message: "Details Updated", newField });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
const additionalField = async (req, res) => {
    const additionalBody = await additional.create(req.body);
    const _id = additionalBody._id;
    const additionalData = { _id, ...additionalBody };
    return res.status(201).json({ additional: additionalData._doc });

}

module.exports = { fieldController, getAllFields, additionalField, getAllFields, getAllWellStructuredData, updateFields };
