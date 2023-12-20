const xlsx = require("xlsx");
const WellPlannedExcelModel = require("../models/wellPlannedSchema");
const tieOnPoint = require("../models/tieOnPoint");
const parseData = require("./parseDataExcel");

const MD_COLUMN_INDEX = 0;
const INC_COLUMN_INDEX = 1;
const AZI_COLUMN_INDEX = 2;
const TVD_COLUMN_INDEX = 3;
const NS_COLUMN_INDEX = 5;
const EW_COLUMN_INDEX = 6;
const VS_COLUMN_INDEX = 15;
const DLS_COLUMN_INDEX = 11;
const TOOLFACE_COLUMN_INDEX = 12;
const BUILDRATE_COLUMN_INDEX = 13;
const TURNRATE_COLUMN_INDEX = 14;
const COMMENTS_COLUMN_INDEX = 20;

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
    const startIndex = data.findIndex(row => row && row[MD_COLUMN_INDEX] && row[MD_COLUMN_INDEX].toString().toLowerCase() === 'md');
    if (startIndex === -1) {
        console.log("Couldn't find 'md' in the specified range.");
        return null;
    }
    // Create tieOnPoint record
    await tieOnPoint.create({
        excelName,
        md: data[startIndex + 2][MD_COLUMN_INDEX],
        inc: data[startIndex + 2][INC_COLUMN_INDEX],
        azi: data[startIndex + 2][AZI_COLUMN_INDEX],
        tvd: data[startIndex + 2][TVD_COLUMN_INDEX],
        ns: data[startIndex + 2][NS_COLUMN_INDEX],
        ew: data[startIndex + 2][EW_COLUMN_INDEX],
        vs: data[startIndex + 2][VS_COLUMN_INDEX],
        dls: data[startIndex + 2][DLS_COLUMN_INDEX],
        userId,
    });

    // Start the loop from the row where "md" is found
    let i = startIndex + 2;
    let id = 1;
    while (data[i] && data[i][MD_COLUMN_INDEX] !== undefined) {
        const rowData = data[i].slice(0, 20);;
        await WellPlannedExcelModel.create({
            userId,
            excelName,
            id,
            fieldNumber: id,
            md: rowData[MD_COLUMN_INDEX],
            inc: rowData[INC_COLUMN_INDEX],
            azi: rowData[AZI_COLUMN_INDEX],
            tvd: rowData[TVD_COLUMN_INDEX],
            tvdss: rowData[TVD_COLUMN_INDEX + 1], // Assuming tvdss is in the next column
            north: rowData[NS_COLUMN_INDEX],
            east: rowData[EW_COLUMN_INDEX],
            dls: rowData[DLS_COLUMN_INDEX],
            toolface: rowData[TOOLFACE_COLUMN_INDEX],
            buildrate: rowData[BUILDRATE_COLUMN_INDEX],
            turnrate: rowData[TURNRATE_COLUMN_INDEX],
            vs: rowData[VS_COLUMN_INDEX],
            comments: data[i][COMMENTS_COLUMN_INDEX],
        });
        i++;
        id++;
    }
};
const minMdmaxMd = async (sheet) => {
    const data = parseData(sheet);
    const startIndex = data.findIndex(row => row && row[MD_COLUMN_INDEX] && row[MD_COLUMN_INDEX].toString().toLowerCase() === 'md');
    if (startIndex === -1) {
        console.log("Couldn't find 'md' in the specified range.");
        return null;
    }
    const lastIndex = data.slice(startIndex + 1).findIndex(row => row && row[MD_COLUMN_INDEX] === undefined);
    const undefinedIndex = lastIndex !== -1 ? startIndex + 1 + lastIndex : -1;
    const minMd = data[startIndex + 3][MD_COLUMN_INDEX];
    const maxMd = data[undefinedIndex - 1][MD_COLUMN_INDEX];
    return { minMd, maxMd };
}

module.exports = { parseExcelData, parseCompleteExcelData, minMdmaxMd };
