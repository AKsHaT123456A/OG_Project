const xlsx = require("xlsx");

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

const parseCompleteExcelData = async (sheet, excelData) => {
    console.log({ e: excelData.data });
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    console.log({ data });
    const mainHeading1 = excelData.data.mainHeading1;
    const mainHeading2 = excelData.data.mainHeading2;
    const dataColumns = excelData.data.data;

    // Extract data from rows 38 to 232 and the first 20 columns
    const resultData = [];
    for (let i = mainHeading1; i <= mainHeading2; i++) {
        if (i == 1) {
            continue;
        }
        const rowData = data[i] && data[i].slice(0, dataColumns);
        console.log({ rowData: rowData[i] });
        if (Array.isArray(rowData)) {
            resultData.push(rowData);
        }
    }

    // Create a result object with the parsed data
    const resultObject = {
        [excelData.data.name]: resultData,
    };
    console.log({ resultObject });
    return resultObject;
};

module.exports = { parseExcelData, parseCompleteExcelData };
