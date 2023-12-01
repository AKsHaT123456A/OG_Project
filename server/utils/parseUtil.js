const xlsx = require("xlsx");

parseExcelData = async (sheet, excelData) => {
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    const extractedData = [];
    const rowData = data[excelData.data.data];
    const rowHead = data[excelData.data.header];
    const rowObject = {};

    rowHead.forEach((header, index) => {
        header = header.replace(/\/| /g, "").replace(/\[|\]/g, "");
        rowObject[header] = rowData[index];
        extractedData.push(rowObject);
    });
    await excelData.model.create(rowObject);

    return extractedData;
}

module.exports = parseExcelData;