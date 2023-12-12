const xlsx = require("xlsx");

const parseExcelData = async (sheet, excelData) => {
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    const mainHeading = excelData.data.mainHeading;
    const name = excelData.name;
    console.log({excelData});
    const mainData = excelData.data.data;
    const specificValue = data[mainHeading] && data[mainHeading][mainData];
    if(Array.isArray(specificValue)){
         
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
}

module.exports = parseExcelData;
