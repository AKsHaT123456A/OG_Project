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

const calculateSurveyValues = (prevDetails, md2, i2, a2, verticalSectionAzimuth) => {

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

    return { cl, dl, dls, rf, tvd, ns, ew, vs };
};


const saveToDatabase = async (prevDetails, md2, i2, a2, fieldNumber, verticalSectionAzimuth, logName, id) => {
    try {

        const { cl, dl, dls, rf, tvd, ns, ew, vs } = calculateSurveyValues(prevDetails, md2, i2, a2, verticalSectionAzimuth);
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
            ns: ns.toFixed(2),
            ew: ew.toFixed(2),
            vs: vs.toFixed(2),
            userId: id,
            excelName: prevDetails.excelName
        });

        await newSurvey.save();
        return { bool: true, newSurvey };
    } catch (err) {
        console.error(err);
        return { bool: false, error: err };
    }
};
const saveToDatabaseEdit = async (prevDetails, md2, i2, a2, fieldNumber, verticalSectionAzimuth, logName, id) => {
    try {
        const prevDetailsNumber = {
            md: Number(prevDetails.md),
            inc: Number(prevDetails.inc),
            azi: Number(prevDetails.azi),
            cl: Number(prevDetails.cl),
            dl: Number(prevDetails.dl),
            dls: Number(prevDetails.dls),
            rf: Number(prevDetails.rf),
            tvd: Number(prevDetails.tvd),
            ns: Number(prevDetails.ns),
            ew: Number(prevDetails.ew),
            vs: Number(prevDetails.vs)
        };
        const { cl, dl, dls, rf, tvd, ns, ew, vs } = calculateSurveyValues(prevDetailsNumber, md2, i2, a2, verticalSectionAzimuth);
        const clNumber = Number(cl);
        const dlNumber = Number(dl);
        const dlsNumber = Number(dls);
        const rfNumber = Number(rf);
        const tvdNumber = Number(tvd);
        const nsNumber = Number(ns);
        const ewNumber = Number(ew);
        const vsNumber = Number(vs);

        // Check if the conversion was successful
        if (!isNaN(clNumber) && !isNaN(dlNumber) && !isNaN(dlsNumber) && !isNaN(rfNumber) && !isNaN(tvdNumber) && !isNaN(nsNumber) && !isNaN(ewNumber) && !isNaN(vsNumber)) {
            // Update the existing document
            const updatedSurvey = await survey.updateOne(
                { fieldNumber, userId: id, logName },
                {
                    $set: {
                        md: md2,
                        logName,
                        inc: i2,
                        azi: a2,
                        cl: clNumber,
                        dl: dlNumber,
                        dls: dlsNumber,
                        rf: rfNumber,
                        tvd: tvdNumber,
                        ns: nsNumber,
                        ew: ewNumber,
                        vs: vsNumber
                    }
                }
            );
            if (!updatedSurvey) {
                console.error('Survey not found for update');
                return { bool: false, error: 'Survey not found for update' };
            }
            const existingDocument = await survey.findOne({ fieldNumber, userId: id, logName });
            return { bool: true, updatedSurvey:existingDocument };
        } else {
            console.error('Invalid values for cl, dl, dls, rf, tvd, ns, ew, or vs');
            console.error({ clNumber, dlNumber, dlsNumber, rfNumber, tvdNumber, nsNumber, ewNumber, vsNumber });
            return { bool: false, error: 'Invalid values for cl, dl, dls, rf, tvd, ns, ew, or vs' };
        }
    } catch (err) {
        console.error(err);
        return { bool: false, error: err.message };
    }
};

module.exports = { saveToDatabaseEdit };

const allSurvey = async (req, res) => {
    try {
        const all = await survey.find({});
        res.status(200).json({ all });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { saveToDatabase, saveToDatabaseEdit, allSurvey };
