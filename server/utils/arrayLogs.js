const log = require("../models/logs");

async function getCompleteLogsByIds(logIds) {
    const completeLogs = await log.find({ _id: { $in: logIds } });

    return completeLogs;
}

module.exports = { getCompleteLogsByIds };