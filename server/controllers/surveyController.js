const survey = require("../models/survey");
const saveToDatabase = require("../utils/saveCalculation");

const surveyController = async (req, res) => {
    const { md2, inc2, azi2, fieldNumber } = req.body;
    try {
        const prevSurvey = await survey.findOne({ fieldNumber });
        if (prevSurvey) {
            return res.status(400).json({
                message: "Survey already exists",
                survey
            });
        }
        if (fieldNumber === "1") {
            let prevDetails = { md: 0, inc: 0, azi: 0, tvd: 0, ns: 0, ew: 0 };
            const surveyDetails = await saveToDatabase(prevDetails, md2, inc2, azi2, fieldNumber);
            if (surveyDetails.bool) {
                return res.status(200).json({
                    message: "Survey received",
                    logs: surveyDetails.newSurvey
                });
            }
        };
    
        const prevFieldNumber = fieldNumber - 1;
        const { md, inc, azi, tvd, ns, ew } = await survey.findOne({ fieldNumber: prevFieldNumber }).select("md inc azi tvd ns ew");
        const prevDetails = { md, inc, azi, tvd, ns, ew };
        const surveyDetails = await saveToDatabase(prevDetails, md2, inc2, azi2, fieldNumber);
        if (surveyDetails.bool) {
            return res.status(200).json({
                message: "Survey received",
                logs: surveyDetails.newSurvey

            });
        }

        return res.status(400).json({
            message: "Survey not received",
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }

};

module.exports = surveyController;