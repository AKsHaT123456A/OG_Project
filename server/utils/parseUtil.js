const WellPlannedExcelModel = require("../models/wellPlannedSchema");
const tieOnPoint = require("../models/tieOnPoint");
const parseData = require("./parseDataExcel");
const constants = require("../connections/indexConstants");
const parseExcelData = async (sheet, excelData) => {
    const data = parseData(sheet);
    const mainHeading = excelData.data.mainHeading;
    const name = excelData.name;
    const mainData = excelData.data.data;
    const specificValue = data[mainHeading] && data[mainHeading][mainData];
    return specificValue ? { [name]: Array.isArray(specificValue) ? specificValue[0] : specificValue } : {};
};

const parseCompleteExcelData = async (sheet, excelName, userId) => {
    const data = parseData(sheet);
    // Find the index where "md" is located in the first column
    const startIndex = data.findIndex(row => row && row[constants.MD_COLUMN_INDEX] && row[constants.MD_COLUMN_INDEX].toString().toLowerCase() === 'md');
    console.log({ startIndex });
    if (startIndex === -1) {
        console.log("Couldn't find 'md' in the specified range.");
        return null;
    }
    // Create tieOnPoint record
    await tieOnPoint.create({
        excelName,
        md: data[startIndex + 2][constants.MD_COLUMN_INDEX],
        inc: data[startIndex + 2][constants.INC_COLUMN_INDEX],
        azi: data[startIndex + 2][constants.AZI_COLUMN_INDEX],
        tvd: data[startIndex + 2][constants.TVD_COLUMN_INDEX],
        ns: data[startIndex + 2][constants.NS_COLUMN_INDEX],
        ew: data[startIndex + 2][constants.EW_COLUMN_INDEX],
        vs: data[startIndex + 2][constants.VS_COLUMN_INDEX],
        dls: data[startIndex + 2][constants.DLS_COLUMN_INDEX],
        userId,
    });
    let i = startIndex + 2;
    let id = 1;
    while (data[i] && data[i][constants.MD_COLUMN_INDEX] !== undefined) {
        const rowData = data[i].slice(0, 20);
        await WellPlannedExcelModel.create({
            userId,
            excelName,
            id,
            fieldNumber: id,
            md: rowData[constants.MD_COLUMN_INDEX],
            inc: rowData[constants.INC_COLUMN_INDEX],
            azi: rowData[constants.AZI_COLUMN_INDEX],
            tvd: rowData[constants.TVD_COLUMN_INDEX],
            tvdss: rowData[constants.TVD_COLUMN_INDEX + 1], // Assuming tvdss is in the next column
            north: rowData[constants.NS_COLUMN_INDEX],
            east: rowData[constants.EW_COLUMN_INDEX],
            dls: rowData[constants.DLS_COLUMN_INDEX],
            toolface: rowData[constants.TOOLFACE_COLUMN_INDEX],
            buildrate: rowData[constants.BUILDRATE_COLUMN_INDEX],
            turnrate: rowData[constants.TURNRATE_COLUMN_INDEX],
            vs: rowData[constants.VS_COLUMN_INDEX],
            comments: data[i][constants.COMMENTS_COLUMN_INDEX],
        });
        i++;
        id++;
    }
};

const minMdmaxMd = async (sheet) => {
    const data = parseData(sheet);
    const startIndex = data.findIndex(row => row && row[constants.MD_COLUMN_INDEX] && row[constants.MD_COLUMN_INDEX].toString().toLowerCase() === 'md');

    if (startIndex === -1) {
        console.log("Couldn't find 'md' in the specified range.");
        return null;
    }

    let lastNonEmptyIndex = -1;
    for (let i = data.length - 1; i >= 0; i--) {
        const row = data[i];
        if (row && row[0] !== undefined && row[0] !== null && row[0].toString().trim() !== '') {
            lastNonEmptyIndex = i;
            break;
        }
    }
    const lastNonEmptyValue = lastNonEmptyIndex !== -1 ? data[lastNonEmptyIndex][0] : null;
    const minMd = data[startIndex + 3][constants.MD_COLUMN_INDEX];

    return { minMd, lastNonEmptyValue };
}

module.exports = { parseExcelData, parseCompleteExcelData, minMdmaxMd };
