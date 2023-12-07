const survey = require("../models/survey");
const { calculateCourseLength, calculateDogLeg, calculateDLS, calculateRF, calculateDeltaTVD, calculateDeltaNS, calculateDeltaEW, calculateVS, customRound } = require("../utils/calculationUtil");

const saveToDatabase = async (prevDetails, md2, i2, a2, fieldNumber) => {
    try {
        console.log({ fieldNumber, prevDetails, md2, i2, a2 });
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
        const vs = calculateVS(a2, ns, ew);
        console.log({ ew, ns, vs });
        const newSurvey = new survey({
            md: customRound(md2, 2),
            inc: i2,
            azi: a2,
            fieldNumber: customRound(fieldNumber, 0),
            cl: customRound(cl, 0),
            dl: customRound(dl, 2),  // Round to 2 decimal places
            dls: customRound(dls, 2),  // Round to 2 decimal places
            rf: customRound(rf, 2),
            tvd: customRound(tvd, 0),
            ns,  // Remove unnecessary precision
            ew,  // Remove unnecessary precision
            vs  // Remove unnecessary precision
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
        return { bool: true, newSurvey };
    }
    catch (err) {
        console.log(err);
        return { bool: false, error: err };
    }
}

module.exports = saveToDatabase;
