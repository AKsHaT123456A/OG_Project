const xlsx = require("xlsx");

const parseData = (sheet) => {
    return xlsx.utils.sheet_to_json(sheet, { header: 1 });
}

module.exports = parseData;