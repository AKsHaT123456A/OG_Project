const xlsx = require("xlsx");
const { parseExcelData, parseCompleteExcelData, minMdmaxMd, getCellValuesByKeywords } = require("../utils/parseUtil");
const detail = require("../models/details");
const parseConstants = require("../connections/dummyController");
const WellPannedExcelModel = require("../models/wellPlannedSchema");
const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const excelArray = require("../connections/excelArray");

const sheetNameFunc = async (buffer) => {

    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return sheet;
};

const fieldController = async (req, res) => {
    try {
        let { id, excelName } = req.query;
        
        if (id === 'null') {
            id = uuidv4();
            await User.create({ id });
        }

        const buffer = req.file.buffer;
        const sheet = await sheetNameFunc(buffer);

        const [arra, minMax] = await Promise.all([
            Promise.all(excelArray.map(async (element) => parseExcelData(sheet, element))),
            minMdmaxMd(sheet)
        ]);
        parseCompleteExcelData(sheet, excelName, id);
        const mergedObject = Object.assign({}, ...arra);
        for (const key in mergedObject) {
            if (mergedObject.hasOwnProperty(key) && mergedObject[key] === undefined) {
                mergedObject[key] = '';
            }
        }

        const newMerge = await detail.findOne({ well: mergedObject.well, userId: id });
        const response = newMerge
            ? res.status(200).json({ message: "Details already exist", newField: newMerge, minMd: minMax.minMd, maxMd: minMax.lastNonEmptyValue })
            : res.status(201).json({ message: "Details added", newField: await detail.create({ ...mergedObject, excelName, userId: id }), id, minMd: minMax.minMd, maxMd: minMax.lastNonEmptyValue });

        return response;

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const getAllFields = async (req, res) => {
    try {
        const { id, excelName } = req.query;
        console.log({ id, excelName });
        const details = await detail.findOne({ excelName, userId: id });
        console.log({ id, details });
        return res.status(200).json({ message: "Send All Details", details });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const getAllWellStructuredData = async (req, res) => {
    try {
        const { excelName, id } = req.query;
        const plan = await WellPannedExcelModel.find({ excelName, userId: id });
        return res.status(200).json({ plan });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

const updateFields = async (req, res) => {
    try {
        const { excelName, id } = req.query;
        const newField = await detail.findOneAndUpdate({ excelName, userId: id }, { ...req.body });
        return res.status(200).json({ message: "Details Updated", newField });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { fieldController, getAllFields, getAllWellStructuredData, updateFields };
