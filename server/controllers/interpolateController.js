const interpolate = require("../models/interpolateModel");
const log = require("../models/logs");
const WellPannedExcelModel = require("../models/wellPlannedSchema");
const { calculateRF, calculateDeltaTVD, calculateDeltaEW, calculateDeltaNS, calculateDLS } = require("../utils/calculationUtil");

const toRadians = degrees => (degrees * Math.PI) / 180;
const toDegrees = radians => (radians * 180) / Math.PI;
const interpolateController = async (req, res) => {
    try {
        const { md, excelName } = req.body;
        console.log({ md, excelName });
        const { id } = req.query;

        const prevMd = await WellPannedExcelModel.findOne({ md, excelName, userId: id });
        console.log({ prevMd });
        if (prevMd) {
            return res.status(400).json({
                md: parseFloat(prevMd.md),
                tvd: parseFloat(prevMd.tvd),
                ew: parseFloat(prevMd.ew),
                ns: parseFloat(prevMd.ns),
                inc: parseFloat(prevMd.inc),
                azi: parseFloat(prevMd.azi),
                rf: parseFloat(prevMd.rf),
            });
        }

        const minMaxValues = await WellPannedExcelModel.aggregate([
            {
                "$match": {
                    "excelName": excelName,
                },
            },
            {
                "$group": {
                    "_id": null,
                    "max": { "$max": "$md" },
                    "min": { "$min": "$md" },
                },
            },
        ]);

        if (!minMaxValues[0]) {
            return res.status(400).json({ error: `No data found for this well` });
        }

        const { min, max } = minMaxValues[0];

        // Check if the input MD is within the valid range
        if (min > md || max < md) {
            return res.status(400).json({ error: `md value must be between ${min} and ${max}` });
        }

        const justLessThanInput = await WellPannedExcelModel.findOne({ md: { $lt: md } }).sort({ md: -1 });
        const justGreaterThanInput = await WellPannedExcelModel.findOne({ md: { $gt: md } }).sort({ md: 1 });

        console.log({ justLessThanInput, justGreaterThanInput });

        // Handle edge cases where the index is out of bounds
        if (!justGreaterThanInput) {
            // No survey greater than the input MD, handle accordingly
            return res.status(400).json({ error: `No survey greater than the input MD` });
        }

        if (!justLessThanInput) {
            // No survey less than the input MD, handle accordingly
            return res.status(400).json({ error: `No survey less than the input MD` });
        }

        // Convert string calculations to numeric calculations
        const brX = parseFloat(justLessThanInput.buildrate) / 100;
        const trX = parseFloat(justLessThanInput.turnrate) / 100;
        const incX = parseFloat(justGreaterThanInput.inc) + brX * (md - parseFloat(justGreaterThanInput.md));
        const aziX = parseFloat(justLessThanInput.azi) + trX * (md - parseFloat(justGreaterThanInput.md));
        const dl = parseFloat(justGreaterThanInput.dls) * (md - parseFloat(justLessThanInput.md));
        const dlX = dl * (md - parseFloat(justGreaterThanInput.md)) / (parseFloat(justLessThanInput.md) - parseFloat(justGreaterThanInput.md));
        const dls = calculateDLS(dlX, md - parseFloat(justLessThanInput.md));
        const rf = calculateRF(dlX);
        console.log({ brX, trX, incX, aziX, dl, dlX, dls, rf });
        const deltaTVD = calculateDeltaTVD(parseFloat(justLessThanInput.inc), incX, rf, md - parseFloat(justLessThanInput.md));
        const tvd = deltaTVD + parseFloat(justLessThanInput.tvd);
        const deltaEW = calculateDeltaEW(parseFloat(justLessThanInput.inc), incX, parseFloat(justLessThanInput.azi), aziX, rf, md - parseFloat(justLessThanInput.md));
        const ew = deltaEW + parseFloat(justLessThanInput.east);
        const deltaNS = calculateDeltaNS(parseFloat(justLessThanInput.inc), incX, parseFloat(justLessThanInput.azi), aziX, rf, md - parseFloat(justLessThanInput.md));
        const ns = deltaNS + parseFloat(justLessThanInput.north);

        console.log({ tvd, ew, ns });

        await interpolate.create({ md, tvd, ew, ns, inc: incX, azi: aziX, rf, excelName, userId: id });

        // Return the results or send them in the response
        return res.json({
            md,
            tvd,
            ew,
            ns,
            inc: incX,
            azi: aziX,
            rf,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getInterpolate = async (req, res) => {
    try {
        const { excelName } = req.query;
        const { id } = req.query;
        const interpolateData = await interpolate.find({ excelName, userId: id });
        return res.status(200).json({ interpolateData });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

module.exports = { interpolateController, getInterpolate };
