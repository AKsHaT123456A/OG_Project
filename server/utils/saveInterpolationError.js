const survey = require("../models/survey");

const interpolate = async (req, res) => {

    const { md, logName } = req.body;
    const minMaxValues = await survey.aggregate([
        { $group: { _id: null, minValue: { $min: `$${md}` }, maxValue: { $max: `$${md}` } } }
    ]).toArray();

    const { minValue, maxValue } = minMaxValues[0] || { minValue: null, maxValue: null };

    if (md < minValue || md > maxValue) {
        return res.status(400).json({ error: `md value must be between ${minValue} and ${maxValue}` });
    };

    const result = await survey.find({
        md: { $gt: inputMd, $lt: inputMd },
    }).project({ _id: 0, md: 1 }).toArray();
    console.log({ result: result });
    if (result.length === 0) {
        return res.status(400).json({ error: `No ${logName} found at ${md}` });
    };


};

function calculateDogleg(MD1, MD2, MDx, DL12) {
    if (MD2 === MD1) {
        console.error('MD1 and MD2 should be different.');
        return null;
    }

    const DLx = ((MDx - MD1) * DL12) / (MD2 - MD1);
    return DLx;
}

module.exports = interpolate; 