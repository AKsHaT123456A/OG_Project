const multer = require("multer");
const xlsx = require("xlsx");
const additional = require("../models/additional");
const field = require("../models/field");
const installation = require("../models/installation");
const slot = require("../models/slot");
const User = require("../models/user");
const well = require("../models/well");
const wellbore = require("../models/wellbore");
const parseExcelData = require("../utils/parseUtil");
const constants = require("../connections/constants");

const fieldController = async (req, res) => {
    try {
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });

        const constWell = constants.WELL;
        const constWellbore = constants.WELLBORE;
        const constInstallation = constants.INSTALLATION;
        const constField = constants.FIELD;
        const constSlot = constants.SLOT;
        const excelArray = [{ data: constWell, model: well }, { data: constWellbore, model: wellbore }, { data: constInstallation, model: installation }, { data: constField, model: field }, { data: constSlot, model: slot }];
        // Assuming you only have one sheet
        const sheetName = workbook.SheetNames[0];
        const array = [];
        excelArray.forEach(async (element) => {
            const parsedData = await parseExcelData(workbook.Sheets[sheetName], element);
            array.push(parsedData);
        });
        const fieldsArray = [{model:well,name:"well"},{model:wellbore,name:"wellbore"},{model:installation,name:"installtion"},{model:field,name:"field"},{model:slot,name:"slot"}];
        const fields = await Promise.all(fieldsArray.map(async (element) => {
            const elementName = element.name;
            const elementModel = element.model;
            const data = {[elementName]:await elementModel.findOne({})}
            return data;
        }));
        // const user = await User.findById(id);
        // await additional.create(req.body);
        // await slot.create(req.body);
        // await field.create(req.body);
        // await installation.create(req.body);
        // await well.create(req.body);
        // await wellbore.create(req.body);

        // const additionalId = additional._id;
        // const slotId = slot._id;
        // const fieldId = field._id;
        // const installationId = installation._id;
        // const wellId = well._id;
        // const wellboreId = wellbore._id;
        // user.additionals.addToSet(additionalId);
        // user.slots.addToSet(slotId);
        // user.fields.addToSet(fieldId);
        // user.installations.addToSet(installationId);
        // user.wells.addToSet(wellId);
        // user.wellbores.addToSet(wellboreId);
        // await user.save();


        // const [] = Promise.all([
        //     User.populate(additional, { path: "additionals", select: "units verticalSectionAzimuth surveyReferencePoint" }),
        //     User.populate(slot, { path: "slots", select: "name gridNorthing gridEasting latitude longitude north east" }),
        //     User.populate(field, { path: "fields", select: "name easting northing mapName northAlignment" }),
        //     User.populate(installation, { path: "installations", select: "name easting northing mapName northAlignment" }),
        //     User.populate(well, { path: "wells", select: "name easting northing mapName northAlignment" }),
        //     User.populate(wellbore, { path: "wellbores", select: "name easting northing mapName northAlignment" }),
        // ]);

        return res.status(201).json({ message: "Details created", fields });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const getAllFields = async (req, res) => {
    try {
        const fieldsArray = [well,wellbore,installation,field,slot];
        const fields = await Promise.all(fieldsArray.map(async (element) => {
            const data = await element.findOne({});
            return data;
        }));
        return res.status(200).json({ message: "Details fetched", fields });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
module.exports = {fieldController,getAllFields};