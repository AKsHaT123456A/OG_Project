const xlsx = require("xlsx");
const { parseExcelData, parseCompleteExcelData, minMdmaxMd } = require("../utils/parseUtil");
const detail = require("../models/details");
const parseConstants = require("../connections/dummyController");
const WellPannedExcelModel = require("../models/wellPlannedSchema");
const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const excelArray = require("../connections/excelArray");

const fieldController = async (req, res) => {
    try {
        let { id } = req.query;
        if (!id) {
            id = uuidv4();
            await User.create({ id });
        }

        const { excelName } = req.query;
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];

        const [arra, minMax] = await Promise.all([
            Promise.all(excelArray.map(async (element) => parseExcelData(workbook.Sheets[sheetName], element))),
            minMdmaxMd(workbook.Sheets[sheetName])
        ]);
        parseCompleteExcelData(workbook.Sheets[sheetName], excelName, id);
        const mergedObject = Object.assign({}, ...arra);
        for (const key in mergedObject) {
            if (mergedObject.hasOwnProperty(key) && mergedObject[key] === undefined) {
                mergedObject[key] = '';
            }
        }

        const newMerge = await detail.findOne({ well: mergedObject.well, userId: id });
        if (newMerge) {
            return res.status(200).json({ message: "Details already exist", newField: newMerge, minMd: minMax.minMd, maxMd: minMax.maxMd });
        }

        const newField = await detail.create({ ...mergedObject, excelName, userId: id });
        return res.status(201).json({ message: "Details added", newField, id, minMd: minMax.minMd, maxMd: minMax.maxMd });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const getAllFields = async (req, res) => {
    try {
        const { id, excelName } = req.query;
        const details = await detail.findOne({ excelName, userId: id });
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
