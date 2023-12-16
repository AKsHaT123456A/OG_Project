const survey = require("../models/survey");

const interpolateController = async (req, res) => {
    try {
        const { md, logName } = req.body;
        console.log({ md, logName });
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
        if (min > md || max < md) {
            return res.status(400).json({ error: `md value must be between ${min} and ${max}` });
        };
        const result = await survey
            .aggregate([
                {
                    $match: {
                        md: {
                            $exists: true, // Ensure the field exists
                        },
                    },
                },
                {
                    $project: {
                        md: 1,
                        vs:1,
                        _id: 0,
                        inc:1,
                        azi:1,
                        cl:1,
                        dl:1,
                        dls:1,
                        rf:1,
                        tvd:1,
                        ns:1,
                        ew:1,
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
                {
                    $limit: 5, // You can adjust this based on the number of closest surveys you want
                },
            ]);
        const index = result.findIndex(doc => doc.absoluteDifference === 0);
        console.log({ index });
        const justGreateThanInput = result[index + 1];
        const justLessThanInput = result[index - 1];
        
        console.log({ fields: result });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = interpolateController;