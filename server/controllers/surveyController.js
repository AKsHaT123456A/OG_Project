const surveyData = require("../connections/excelArrayData");
const detail = require("../models/details");
const survey = require("../models/survey");
const {
    saveToDatabase,
    saveToDatabaseEdit,
} = require("../utils/saveCalculation");

const surveyController = async (req, res) => {
    try {
        const { md, inc, azi, fieldNumber, logName, well, tieAzi } = req.body;
        const { id } = req.query;
        const userId = id;

        const prevSurvey = await survey.findOne({ fieldNumber, userId, logName });
        if (prevSurvey) {
            return res.status(200).json({ message: `Survey ${fieldNumber} already exists` });
        }

        const { verticalSectionAzimuth } = await detail.findOne({ well }).select("verticalSectionAzimuth");
        const angleWithoutDegree = verticalSectionAzimuth.replace(/°/g, '');

        const prevFieldNumber = fieldNumber - 1;

        const prevDetails = fieldNumber == "1"
            ? { md: 0, inc: 0, azi: tieAzi, tvd: 0, ns: 0, ew: 0 }
            : await survey.findOne({ fieldNumber: prevFieldNumber, logName }).select("md inc azi tvd ns ew");
        const surveyDetails = await saveToDatabase(
            prevDetails,
            md,
            inc,
            azi,
            fieldNumber,
            angleWithoutDegree,
            logName,
            userId
        );

        if (surveyDetails.bool) {
            return res.status(201).json({
                message: fieldNumber == "1" ? "Survey added" : "Calculated",
                newSurvey: surveyDetails.newSurvey,
            });
        }
    } catch (err) {
        console.error("Error processing surveys:", err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};



const getAllSurveys = async (req, res) => {
    try {
        const userId = req.query.id;
        const { logName } = req.query;
        const surveys = await survey.find({ userId, logName });
        return res.status(200).json({ surveys });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};

const updateSurvey = async (req, res) => {
    try {
        const { updatedTieAzi, logName, well } = req.body;
        const surveys = await survey.find({ logName });
        const userId = req.query.id;

        const updatedSurvey = surveys.map(async (survey) => {
            const { verticalSectionAzimuth } = await detail
                .findOne({ well })
                .select("verticalSectionAzimuth");
            const angleWithoutDegree = verticalSectionAzimuth.replace(/°/g, '');

            const prevSurvey = await survey.findOne({ fieldNumber, userId, logName });
            if (prevSurvey) {
                return res.status(200).json({
                    message: `Survey ${fieldNumber} already exists `,
                });
            }

            if (fieldNumber === 1) {
                const prevDetails = { md: 0, inc: 0, azi: updatedTieAzi, tvd: 0, ns: 0, ew: 0 };
                const surveyDetails = await saveToDatabaseEdit(
                    prevDetails,
                    md,
                    inc,
                    azi,
                    fieldNumber,
                    angleWithoutDegree,
                    logName,
                    userId
                );

                if (surveyDetails.bool) {
                    const newSurvey = surveyDetails.newSurvey;
                    return res.status(201).json({ message: "Survey added", newSurvey });
                }
            }

            const prevFieldNumber = fieldNumber - 1;
            const {
                md: prevMd,
                inc: prevInc,
                azi: prevAzi,
                tvd,
                ns,
                ew,
            } = await survey.findOne({ fieldNumber: prevFieldNumber }).select("md inc azi tvd ns ew");

            const prevDetails = { md: prevMd, inc: prevInc, azi: prevAzi, tvd, ns, ew };
            const surveyDetails = await saveToDatabaseEdit(
                prevDetails,
                md,
                inc,
                azi,
                fieldNumber,
                angleWithoutDegree,
                logName,
                userId
            );

            if (surveyDetails.bool) {
                return res.status(200).json({
                    message: "Calculated",
                    newSurvey: surveyDetails.newSurvey,
                });
            }
        });

        await Promise.all(updatedSurvey);
        return res.status(200).json({ message: "Updated", surveys });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};

const updateSurveyList = async (req, res) => {
    try {
        const { md, azi, inc, fieldNumber } = req.body;
        if (fieldNumber === "1") {
            const prevDetails = { md: 0, inc: 0, azi: 0, tvd: 0, ns: 0, ew: 0 };
            const surveyDetails = await saveToDatabaseEdit(
                prevDetails,
                md,
                inc,
                azi,
                fieldNumber,
                verticalSectionAzimuth,
                logName
            );

            if (surveyDetails.bool) {
                const newSurvey = surveyDetails.newSurvey;
                return res.status(201).json({ message: "Survey added", newSurvey });
            }
        }

        const surveys = await survey.findOne({ fieldNumber });
        const prevFieldNumber = fieldNumber - 1;
        const { md: prevMd, inc: prevInc, azi: prevAzi, tvd, ns, ew } = await survey
            .findOne({ fieldNumber: prevFieldNumber })
            .select("md inc azi tvd ns ew");

        const prevDetails = { md: prevMd, inc: prevInc, azi: prevAzi, tvd, ns, ew };
        const surveyDetails = await saveToDatabaseEdit(
            prevDetails,
            md,
            inc,
            azi,
            fieldNumber,
            verticalSectionAzimuth,
            logName
        );

        if (surveyDetails.bool) {
            return res.status(200).json({
                message: "Calculated",
                newSurvey: surveyDetails.newSurvey,
            });
        }
    } catch (err) {
        console.error("Error processing surveys:", err.message);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

module.exports = { surveyController, updateSurveyList, updateSurvey, getAllSurveys };
