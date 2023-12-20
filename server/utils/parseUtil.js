const xlsx = require("xlsx");
const WellPannedExcelModel = require("../models/wellPlannedSchema");
const tieOnPoint = require("../models/tieOnPoint");

const parseExcelData = async (sheet, excelData) => {
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    const mainHeading = excelData.data.mainHeading;
    const name = excelData.name;
    const mainData = excelData.data.data;

    const specificValue = data[mainHeading] && data[mainHeading][mainData];

    if (Array.isArray(specificValue)) {
        return {
            [name]: specificValue[0],
        };
    }

    if (specificValue !== null) {
        return {
            [name]: specificValue,
        };
    }

    return {};
};

const parseCompleteExcelData = async (sheet, excelData, excelName, userId) => {
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    const dataColumns = excelData.data.data;

    let startIndex = -1;

    // Find the index where "md" is located in the first column
    for (let i = 0; i <= 231; i++) {
        const mdCellValue = data[i] && data[i][0];

        if (mdCellValue && mdCellValue.toString().toLowerCase() === 'md') {
            await tieOnPoint.create({
                excelName,
                md: data[i+2][0],
                inc: data[i+2][1],
                azi: data[i+2][2],
                tvd: data[i+2][3],
                ns: data[i+2][5],
                ew: data[i+2][6],
                vs: data[i+2][15],
                dls: data[i+2][11],
                userId
            })
            startIndex = i;
            break;  // Stop searching once "md" is found
        }
    }


    if (startIndex === -1) {
        console.log("Couldn't find 'md' in the specified range.");
        return null;
    }

    // Start the loop from the row where "md" is found
    let i = startIndex + 2; // Starting from the third row after "md"
    let id = 1;
    while (data[i] && data[i][0] !== undefined) {
        const rowData = data[i].slice(0, dataColumns);


        const wellPlanned = await WellPannedExcelModel.create({
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
            dls: rowData[11],
            toolface: rowData[12],
            buildrate: rowData[13],
            turnrate: rowData[14],
            vs: rowData[15],
            comments: data[i][20]
        });


        i++;
        id++;
    }
};

module.exports = { parseExcelData, parseCompleteExcelData };
