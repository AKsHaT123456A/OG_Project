const log = require("../models/logs");
const survey = require("../models/survey");
const {
    calculateCourseLength,
    calculateDogLeg,
    calculateDLS,
    calculateRF,
    calculateDeltaTVD,
    calculateDeltaNS,
    calculateDeltaEW,
    calculateVS,
    customRound
} = require("../utils/calculationUtil");

const saveToDatabase = async (prevDetails, md2, i2, a2, fieldNumber, verticalSectionAzimuth, logName, id) => {
    try {
        console.log({ fieldNumber, prevDetails, md2, i2, a2, verticalSectionAzimuth });

        const cl = calculateCourseLength(prevDetails.md, md2);
        const dl = calculateDogLeg(prevDetails.inc, i2, prevDetails.azi, a2);
        const dls = calculateDLS(dl, cl);
        const rf = calculateRF(dl);
        const deltaMD = md2 - prevDetails.md;
        const deltaTVD = calculateDeltaTVD(prevDetails.inc, i2, rf, deltaMD);
        const tvd = prevDetails.tvd + deltaTVD;
        const deltaNS = calculateDeltaNS(prevDetails.inc, i2, prevDetails.azi, a2, rf, deltaMD);
        const deltaEW = calculateDeltaEW(prevDetails.inc, i2, prevDetails.azi, a2, rf, deltaMD);
        const ew = prevDetails.ew + deltaEW;
        const ns = prevDetails.ns + deltaNS;
        const vs = calculateVS(verticalSectionAzimuth, ns, ew);

        const newSurvey = new survey({
            logName,
            md: md2,
            inc: i2,
            azi: a2,
            fieldNumber: customRound(fieldNumber, 0),
            cl,
            dl,
            dls,
            rf,
            tvd,
            ns,
            ew,
            vs,
            userId: id
        });

        console.log({
            cl,
            dl,
            dls,
            rf,
            tvd,
            ns,
            ew,
            vs
        });

        await newSurvey.save();
        const logs = await log.findOne({ logName });
        await logs.surveys.push(newSurvey._id);
        await logs.save();

        await log.findOne({ logName }).populate("surveys").select("-_id -__v");
        return { bool: true, newSurvey };
    } catch (err) {
        console.log(err);
        return { bool: false, error: err };
    }
};

const saveToDatabaseEdit = async (prevDetails, md2, i2, a2, fieldNumber, verticalSectionAzimuth, logName, id) => {
    try {
        console.log({ fieldNumber, prevDetails, md2, i2, a2, verticalSectionAzimuth });

        const cl = calculateCourseLength(prevDetails.md, md2);
        const dl = calculateDogLeg(prevDetails.inc, i2, prevDetails.azi, a2);
        const dls = calculateDLS(dl, cl);
        const rf = calculateRF(dl);
        const deltaMD = md2 - prevDetails.md;
        const deltaTVD = calculateDeltaTVD(prevDetails.inc, i2, rf, deltaMD);
        const tvd = prevDetails.tvd + deltaTVD;
        const deltaNS = calculateDeltaNS(prevDetails.inc, i2, prevDetails.azi, a2, rf, deltaMD);
        const deltaEW = calculateDeltaEW(prevDetails.inc, i2, prevDetails.azi, a2, rf, deltaMD);
        const ew = prevDetails.ew + deltaEW;
        const ns = prevDetails.ns + deltaNS;
        const vs = calculateVS(verticalSectionAzimuth, ns, ew);

        const newSurvey = await survey.findOne({ fieldNumber, userId: id });
        newSurvey.md = md2;
        newSurvey.inc = i2;
        newSurvey.azi = a2;
        newSurvey.cl = cl;
        newSurvey.dl = dl;
        newSurvey.dls = dls;
        newSurvey.rf = rf;
        newSurvey.tvd = tvd;
        newSurvey.ns = ns;
        newSurvey.ew = ew;
        newSurvey.vs = vs;

        await newSurvey.save();
        const logs = await log.findOne({ logName });
        await logs.surveys.push(newSurvey._id);
        await logs.save();

        await log.findOne({ logName }).populate("surveys").select("-_id -__v");
        return { bool: true, newSurvey };
    } catch (err) {
        console.log(err);
        return { bool: false, error: err };
    }
};

const allSurvey = async (req, res) => {
    try {
        const all = await survey.find({});
        return res.status(200).json({ all });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { saveToDatabase, saveToDatabaseEdit, allSurvey };
