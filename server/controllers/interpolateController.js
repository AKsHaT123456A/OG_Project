const survey = require("../models/survey");

const toRadians = degrees => (degrees * Math.PI) / 180;

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
                    _id: 0,
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
        console.log({ fields: result });

        // Find the surveys just greater and less than the input MD
        const index = result.findIndex(doc => doc.absoluteDifference === 0);
        console.log({ index });
        const justGreaterThanInput = result[index + 1];
        const justLessThanInput = result[index - 1];
        console.log({ justGreaterThanInput, justLessThanInput });

        // Perform Dogleg (DLx) calculation
        const DL12 = justGreaterThanInput.dl - justLessThanInput.dl;
        const DLx = ((md - justLessThanInput.md) * DL12) / (justGreaterThanInput.md - justLessThanInput.md);

        // Verify DL12 using DLS at Station 2
        const DLS2 = justGreaterThanInput.dl;
        const verifiedDL12 = (DLS2 * (justGreaterThanInput.md - justLessThanInput.md)) / 100;

        // Calculate IncX using the provided formula
        const inc1 = toRadians(justLessThanInput.inc);
        const inc2 = toRadians(justGreaterThanInput.inc);
        const azi1 = toRadians(justLessThanInput.azi);
        const azi2 = toRadians(justGreaterThanInput.azi);
        const DLxRadians = toRadians(DLx);

        const numerator = (Math.sin(inc1) * Math.sin(azi1) * Math.sin(DL12 - DLxRadians)) +
            (Math.sin(inc1) * Math.sin(azi2) * Math.sin(DLxRadians));

        const denominator = (Math.sin(inc1) * Math.cos(azi1) * Math.sin(DL12 - DLxRadians)) +
            (Math.sin(inc2) * Math.cos(azi2) * Math.sin(DLxRadians));

        const incX = Math.atan2(numerator, denominator);
        console.log({ incX });
        // Convert back to degrees
        const incXDegrees = (incX * 180) / Math.PI;

        // Output the results
        console.log({
            justGreaterThanInput,
            justLessThanInput,
            DL12,
            DLx,
            verifiedDL12,
            incX: incXDegrees,
        });

        // Return the results or send them in the response
        return res.json({
            justGreaterThanInput,
            justLessThanInput,
            DL12,
            DLx,
            verifiedDL12,
            incX: incXDegrees,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = interpolateController;
