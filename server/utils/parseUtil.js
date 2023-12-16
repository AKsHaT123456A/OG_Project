const xlsx = require("xlsx");
const WellPannedExcelModel = require("../models/wellPlannedSchema");

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
            console.log({ i, mdCellValue });
            startIndex = i;
            break;  // Stop searching once "md" is found
        }
    }

    console.log({ startIndex: startIndex });

    if (startIndex === -1) {
        console.log("Couldn't find 'md' in the specified range.");
        return null;
    }

    // Start the loop from the row where "md" is found
    let i = startIndex + 2; // Starting from the third row after "md"
    while (data[i] && data[i][0] !== undefined) {
        const rowData = data[i].slice(0, dataColumns);
        const id = i -( startIndex + 1);

        
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
    }
};

module.exports = { parseExcelData, parseCompleteExcelData };
