const surveyData = require("../connections/excelArrayData");
const data = require("../connections/excelArrayData");
const detail = require("../models/details");
const log = require("../models/logs");
const survey = require("../models/survey");
const { calculateVS, calculateDLS, calculateDogLeg, calculateDeltaNS } = require("../utils/calculationUtil");
const saveToDatabase = require("../utils/saveCalculation");

const surveyController = async (req, res) => {

    try {
        const { md, inc, azi, fieldNumber, logName, well } = req.body;

        if (!md || !inc || !azi || !fieldNumber || !logName) {
            return res.status(400).json({
                message: "Bad request",
                error: "Please provide all the required fields"
            });
        }
            const prevSurvey = await survey.findOne({ fieldNumber });
            const { verticalSectionAzimuth } = await detail.findOne({ well }).select("verticalSectionAzimuth");
            if (prevSurvey) {
                console.log(`Survey ${fieldNumber} already exists`);
                return res.status(409).json({
                    message: `Survey ${fieldNumber} already exists`,
                });
            }
            if (fieldNumber === 1) {
                let prevDetails = { md: 0, inc: 0, azi: 0, tvd: 0, ns: 0, ew: 0 };
                const surveyDetails = await saveToDatabase(prevDetails, md, inc, azi, fieldNumber, verticalSectionAzimuth, logName);
                if (surveyDetails.bool) {
                    const newSurvey = surveyDetails.newSurvey;
                    console.log(`Survey ${fieldNumber} received`);
                    return res.status(201).json({ message: "Survey added", newSurvey });
                }
            }
                const prevFieldNumber = fieldNumber - 1;
                const { md: prevMd, inc: prevInc, azi: prevAzi, tvd, ns, ew } =
                    await survey.findOne({ fieldNumber: prevFieldNumber }).select("md inc azi tvd ns ew");

                const prevDetails = { md: prevMd, inc: prevInc, azi: prevAzi, tvd, ns, ew };
                const surveyDetails = await saveToDatabase(prevDetails, MD, Inclination, Azimuth, fieldNumber, 17.50, "12.5'' ST MWD Surveys");

                if (surveyDetails.bool) {
                    console.log(`Survey ${fieldNumber} received`);
                }
        return res.status(200).json({
            message: "Calculated",
            // newSurvey: surveyDetails.newSurvey,
        });

    } catch (err) {
        console.error("Error processing surveys:", err.message);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};
const hi = () => {
    calculateDogLeg(12, 12, 330, 330);
    const h = calculateDeltaNS(90.36, 90.36, 39.3, 39.3, 1, 3.51)
    console.log(h);
}
const updateSurvey = async (req, res) => {
    try {
        const { updatedAzimuth } = req.body;
        const surveys = await survey.find({});
        const updatedSurvey = surveys.map((survey) => {
            const { ns, ew } = survey;
            const vs = calculateVS(updatedAzimuth, ns, ew);
            survey.vs = vs;
            return survey.save();
        });
        Promise.all(updatedSurvey);
        return res.status(200).json({ message: "Updated", surveys });
    }
    catch (err) {
        return res.status(500).json({ err: err.message });
    }
};
const updateSurveyList = async (req, res) => {
    const { md, azi, inc, fieldNumber } = req.body;
    if (fieldNumber === "1") {

    }
    const surveys = await survey.findOne({ fieldNumber });


}
module.exports = { surveyController, updateSurvey, hi };