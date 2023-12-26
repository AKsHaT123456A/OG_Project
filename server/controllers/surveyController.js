const surveyData = require("../connections/excelArrayData");
const detail = require("../models/details");
const survey = require("../models/survey");
const tieOnPoint = require("../models/tieOnPoint");
const {
    saveToDatabase,
    saveToDatabaseEdit,
} = require("../utils/saveCalculation");

const surveyController = async (req, res) => {
    try {
        const { md, inc, azi, fieldNumber, logName, well ,excelName} = req.body;
        const { id } = req.query;
        const userId = id;
        const tieOnPoint1 = await tieOnPoint.findOne({ userId: id, excelName }).select("md cl inc azi tvd ns ew vs dls");
        console.log(tieOnPoint1);
        const prevSurvey = await survey.findOne({ fieldNumber, userId, logName });
        if (prevSurvey) {
            return res.status(200).json({ message: `Survey ${fieldNumber} already exists` });
        }

        const { verticalSectionAzimuth } = await detail.findOne({ well }).select("verticalSectionAzimuth");
        const angleWithoutDegree = verticalSectionAzimuth.replace(/°/g, '');

        const prevFieldNumber = fieldNumber - 1;

        const prevDetails = fieldNumber == "1"
            ? { md: tieOnPoint1.md, inc: tieOnPoint1.inc, azi: tieOnPoint1.azi, tvd: tieOnPoint1.tvd, ns: tieOnPoint1.ns, ew: tieOnPoint1.ew }
            : await survey.findOne({ fieldNumber: prevFieldNumber, logName }).select("md inc azi tvd ns ew");
        console.log(prevDetails);
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

const lengthSurvey = async (req, res) => {
    try {
        const { id } = req.query;
        const { logName } = req.query;
        const surveys = await survey.find({ userId: id, logName });
        const length = surveys.length;
        return res.status(200).json({ length });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

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
        const { updatedTieAzi, updatedTieMd, updatedTieInc, updatedTieTvd, updatedTieNs, updatedTieEw, logName, well } = req.body;
        const userId = req.query.id;
        const surveys = await survey.find({ logName, userId });

        const updatedSurveys = [];

        for (const surveyDetail of surveys) {
            const { verticalSectionAzimuth } = await detail.findOne({ well }).select("verticalSectionAzimuth");
            const angleWithoutDegree = verticalSectionAzimuth.replace(/°/g, '');
            const fieldNumber = surveyDetail.fieldNumber;

            let prevDetails;
            if (fieldNumber === "1") {
                prevDetails = { md: updatedTieMd, inc: updatedTieInc, azi: updatedTieAzi, tvd: updatedTieTvd, ns: updatedTieNs, ew: updatedTieEw };
            } else {
                const prevFieldNumber = fieldNumber - 1;
                const {
                    md: prevMd,
                    inc: prevInc,
                    azi: prevAzi,
                    tvd,
                    ns,
                    ew,
                } = await survey.findOne({ fieldNumber: prevFieldNumber,logName }).select("md inc azi tvd ns ew");

                prevDetails = { md: prevMd, inc: prevInc, azi: prevAzi, tvd, ns, ew };
            }

            const surveyDetails = await saveToDatabaseEdit(
                prevDetails,
                surveyDetail.md,
                surveyDetail.inc,
                surveyDetail.azi,
                fieldNumber,
                angleWithoutDegree,
                logName,
                userId
            );

            if (surveyDetails.bool) {
                updatedSurveys.push(surveyDetails.updatedSurvey);
            }
        }

        return res.status(200).json({ message: "Updated", surveys: updatedSurveys });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};

const updateSurveyList = async (req, res) => {
    try {
        const { md, azi, inc, fieldNumber, logName, well, excelName } = req.body;
        const { id } = req.query;
        const tieOnPoint1 = await tieOnPoint.findOne({ userId: id, excelName }).select("md cl inc azi tvd ns ew vs dls");
        const { verticalSectionAzimuth } = await detail.findOne({ well }).select("verticalSectionAzimuth");
        const angleWithoutDegree = verticalSectionAzimuth.replace(/°/g, '');
        if (fieldNumber === "1") {
            const prevDetails = { md: tieOnPoint1.md, inc: tieOnPoint1.inc, azi: tieOnPoint1.azi, tvd: tieOnPoint1.tvd, ns: tieOnPoint1.ns, ew: tieOnPoint1.ew };
            const surveyDetails = await saveToDatabaseEdit(
                prevDetails,
                md,
                inc,
                azi,
                fieldNumber,
                angleWithoutDegree,
                logName,
                id
            );

            if (surveyDetails.bool) {
                const newSurvey = surveyDetails.updatedSurvey;
                return res.status(201).json({ message: "Survey added", newSurvey });
            }
        }

        const prevFieldNumber = fieldNumber - 1;
        console.log(prevFieldNumber);
        const { md: prevMd, inc: prevInc, azi: prevAzi, tvd, ns, ew } = await survey
            .findOne({ fieldNumber: prevFieldNumber,logName })
            .select("md inc azi tvd ns ew");

        const prevDetails = { md: prevMd, inc: prevInc, azi: prevAzi, tvd, ns, ew };
        console.log(prevDetails);
        const surveyDetails = await saveToDatabaseEdit(
            prevDetails,
            md,
            inc,
            azi,
            fieldNumber,
            angleWithoutDegree,
            logName,
            id
        );

        if (surveyDetails.bool) {
            return res.status(200).json({
                message: "Calculated",
                newSurvey: surveyDetails.updatedSurvey,
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

module.exports = { surveyController, updateSurveyList, updateSurvey, getAllSurveys, lengthSurvey };
