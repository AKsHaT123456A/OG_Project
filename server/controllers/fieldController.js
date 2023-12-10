const xlsx = require("xlsx");
const additional = require("../models/additional");
const field = require("../models/field");
const installation = require("../models/installation");
const slot = require("../models/slot");
const well = require("../models/well");
const wellbore = require("../models/wellbore");
const parseExcelData = require("../utils/parseUtil");
const constants = require("../connections/constants");
const detail = require("../models/details");

const fieldController = async (req, res) => {
    try {
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
        ];
        const sheetName = workbook.SheetNames[0];

        const arra = await Promise.all(excelArray.map(async (element) => {
            const parsedData = await parseExcelData(workbook.Sheets[sheetName], element);
            return parsedData;
        }));
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
        const newField = await detail.create({ ...mergedObject });
        return res.status(201).json({ message: "Details added", newField });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
const getAllFields = async (req, res) => {
    try {
        const fieldsArray = [well, wellbore, installation, field, slot];
        const fields = await Promise.all(fieldsArray.map(async (element) => {
            const data = await element.findOne({});
            return data;
        }));
        return res.status(200).json({ message: "Details fetched", fields });
    } catch (error) {

        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const additionalField = async (req, res) => {
    const additionalBody = await additional.create(req.body);
    const _id = additionalBody._id;
    const additionalData = { _id, ...additionalBody };
    return res.status(201).json({ additional: additionalData._doc });

}
module.exports = { fieldController, getAllFields, additionalField };