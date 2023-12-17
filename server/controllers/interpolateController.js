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
        const id = "d80defd4-3398-4745-8c03-8e0f6825afc3";
        // Get the min and max MD values from the database
        const minMaxValues = await WellPannedExcelModel.aggregate([
            {
                "$match": {
                    "excelName": excelName,
                }
            },
            {
                "$group": {
                    "_id": null,
                    "max": { "$max": "$md" },
                    "min": { "$min": "$md" }
                }
            }
        ]);
        if (!minMaxValues[0]) {
            return res.status(400).json({ error: `No data found for this well` });
        }
        const { min, max } = minMaxValues[0];

        // Check if the input MD is within the valid range
        if (min > md || max < md) {
            return res.status(400).json({ error: `md value must be between ${min} and ${max}` });
        }

        // Find the closest surveys
        const result = await WellPannedExcelModel.aggregate([
            {
                $match: {
                    md: { $exists: true },
                    excelName: excelName,
                },
            },
            {
                $project: {
                    md: 1,
                    vs: 1,
                    inc: 1,
                    azi: 1,
                    dls: 1,
                    tvd: 1,
                    east: 1,
                    north: 1,
                    buildrate: 1,
                    turnrate: 1,
                },
            },
            {
                $addFields: {
                    absoluteDifference: { $subtract: [{ $toDouble: "$md" }, md] },
                },
            },
            {
                $sort: {
                    absoluteDifference: 1, // Sort in ascending order of absolute difference
                },
            },
        ]);

        // Find the index with the closest absolute difference to 0
        let closestToZeroIndex = 0;
        let closestToZeroDifference = Math.abs(result[0].absoluteDifference);

        for (let i = 1; i < result.length; i++) {
            const currentDifference = Math.abs(result[i].absoluteDifference);

            if (currentDifference < closestToZeroDifference) {
                closestToZeroIndex = i;
                closestToZeroDifference = currentDifference;
            }
        }

        // Get the closest survey to 0
        const closestToZero = result[closestToZeroIndex];
        console.log({ closestToZero });

        // Find the surveys just greater and less than the input MD
        const justGreaterThanInput = result[closestToZeroIndex + 1];
        const justLessThanInput = result[closestToZeroIndex - 1];
        console.log({ justGreaterThanInput, justLessThanInput });


        // Calculate DLx
        let brX = (justLessThanInput.buildrate) / 100;
        let trX = (justLessThanInput.turnrate) / 100;
        let incX = justGreaterThanInput.inc + brX * (md - justGreaterThanInput.md);
        let aziX = (justLessThanInput.azi) + trX * (md - justGreaterThanInput.md);
        const dl = justGreaterThanInput.dls * (md - justLessThanInput.md);
        const dlX = dl * (md - justGreaterThanInput.md) / (justLessThanInput.md - justGreaterThanInput.md);
        const dls = calculateDLS(dlX, md - justLessThanInput.md);
        const rf = calculateRF(dlX);
        console.log({ brX, trX, incX, aziX, dlX });
        console.log({ rf });
        const deltaTVD = calculateDeltaTVD(justLessThanInput.inc, incX, rf, md - justLessThanInput.md);
        const tvd = deltaTVD + justLessThanInput.tvd;
        const deltaEW = calculateDeltaEW(justLessThanInput.inc, incX, justLessThanInput.azi, aziX, rf, md - justLessThanInput.md);
        const ew = deltaEW + justLessThanInput.east;
        const deltaNS = calculateDeltaNS(justLessThanInput.inc, incX, justLessThanInput.azi, aziX, rf, md - justLessThanInput.md);
        const ns = deltaNS + justLessThanInput.north;
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
            // dls: dlX,
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
        const id = "d80defd4-3398-4745-8c03-8e0f6825afc3";
        const interpolateData = await interpolate.find({ excelName, userId: id });
        return res.status(200).json({ interpolateData });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

module.exports = {interpolateController,getInterpolate};
