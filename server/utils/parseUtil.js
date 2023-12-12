const xlsx = require("xlsx");
const WellPannedExcelModel = require("../models/wellPlannedSchema");

const parseExcelData = async (sheet, excelData) => {
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    const mainHeading = excelData.data.mainHeading;
    const name = excelData.name;
    console.log({ excelData });
    const mainData = excelData.data.data;
    const specificValue = data[mainHeading] && data[mainHeading][mainData];
    if (Array.isArray(specificValue)) {

        const resultObject = {
            [name]: specificValue[0],
        };
        return resultObject;
    }
    if (specificValue !== null) {
        const resultObject = {
            [name]: specificValue,
        };
        return resultObject;
    } else {
        return {};
    }
};

const parseCompleteExcelData = async (sheet, excelData,excelName,userId) => {
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    const mainHeading1 = excelData.data.mainHeading1;
    const mainHeading2 = excelData.data.mainHeading2;
    const dataColumns = excelData.data.data;

    // Extract data from rows 38 to 232 and the first 20 columns
    const resultData = [];
    for (let i = 40; i <= 231; i++) {
        const rowData = data[i] && data[i].slice(0, dataColumns);
        const id = i - 39;
        const prevWell = await WellPannedExcelModel.findOne({userId,excelName,id});
        if(prevWell){
            return prevWell;
        }
        const wellPlanned = await WellPannedExcelModel.create( {
            userId,
            excelName,
            id,
            fieldNumber: id,
            md: rowData[0],
            inc: rowData[1],
            azi: rowData[2],
            tvd: rowData[3],
            tvdss: rowData[4],
            north: rowData[5],
            east: rowData[6],
            dls: rowData[7],
            toolface: rowData[8],
            buildrate: rowData[9],
            turnrate: rowData[10],
            vs: rowData[11],
            comments: rowData[12]
        });
    }
    return wellPlanned;

    // Create a result object with the parsed data
    const resultObject = {
        [excelData.data.name]: resultData[0],
    };
    console.log({ resultObject });
    return resultObject;
};

module.exports = { parseExcelData, parseCompleteExcelData };
