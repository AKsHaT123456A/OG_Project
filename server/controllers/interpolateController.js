const survey = require("../models/survey");

const toRadians = degrees => (degrees * Math.PI) / 180;
const toDegrees = radians => (radians * 180) / Math.PI;

const interpolateController = async (req, res) => {
    try {
        const { md, logName } = req.body;
        console.log({ md, logName });

        // Get the min and max MD values from the database
        const minMaxValues = await survey.aggregate([
            {
                "$group": {
                    "_id": null,
                    "max": { "$max": "$md" },
                    "min": { "$min": "$md" }
                }
            }
        ]);
        const { min, max } = minMaxValues[0];

        // Check if the input MD is within the valid range
        if (min > md || max < md) {
            return res.status(400).json({ error: `md value must be between ${min} and ${max}` });
        }

        // Find the closest surveys
        const result = await survey.aggregate([
            {
                $match: {
                    md: { $exists: true },
                },
            },
            {
                $project: {
                    md: 1,
                    vs: 1,
                    inc: 1,
                    azi: 1,
                    cl: 1,
                    dl: 1,
                    dls: 1,
                    rf: 1,
                    tvd: 1,
                    ns: 1,
                    ew: 1,
                },
            },
            {
                $addFields: {
                    absoluteDifference: { $subtract: ['$md', md] },
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
        console.log({ justGreaterThanInput, closestToZero });

        // Verify DL with the calculated DL12
        if (Math.abs(DL - DL12) > 0.001) {
            return res.status(500).json({ error: "DL verification failed" });
        }

        // Calculate DLx
        const DLx = ((md - justLessThanInput.md) * DL) / (justGreaterThanInput.md - justLessThanInput.md);

        // Calculate Inclination (Ix) using radians
        const I1 = toRadians(justLessThanInput.inc);
        const I2 = toRadians(justGreaterThanInput.inc);
        const A1 = toRadians(justLessThanInput.azi);
        const A2 = toRadians(justGreaterThanInput.azi);
        const DLxRadians = toRadians(DLx);

        const numerator = (Math.sin(I1) * Math.sin(A1) * Math.sin(DL12 - DLxRadians)) +
            (Math.sin(I1) * Math.sin(A2) * Math.sin(DLxRadians));

        const denominator = (Math.sin(I1) * Math.cos(A1) * Math.sin(DL12 - DLxRadians)) +
            (Math.sin(I2) * Math.cos(A2) * Math.sin(DLxRadians));

        const Ix = Math.atan2(numerator, denominator);

        // Calculate Azimuth (Ax) using radians
        const DLS = justGreaterThanInput.dls;
        const Ax = Math.acos((Math.cos(I2) * Math.cos(DLS)) +
            (Math.sin(DLS) * ((Math.cos(I1) - (Math.cos(I1) * Math.cos(DL))) / Math.sin(DL))));

        // Convert angles back to degrees
        const IxDegrees = toDegrees(Ix);
        const AxDegrees = toDegrees(Ax);

        // Output the results
        console.log({
            justGreaterThanInput,
            justLessThanInput,
            DL12,
            DL,
            DLx,
            Ix: IxDegrees,
            Ax: AxDegrees,
        });

        // Return the results or send them in the response
        return res.json({
            justGreaterThanInput,
            justLessThanInput,
            DL12,
            DL,
            DLx,
            Ix: IxDegrees,
            Ax: AxDegrees,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = interpolateController;
