const survey = require("../models/survey");
const { calculateCourseLength, calculateDogLeg, calculateDLS, calculateRF, calculateDeltaTVD, calculateDeltaNS, calculateDeltaEW, calculateVS } = require("../utils/calculationUtil");

const saveToDatabase = async (prevDetails, md2, i2, a2, fieldNumber) => {
    try {
        console.log({ fieldNumber, prevDetails, md2, i2, a2 });
        const cl = calculateCourseLength(prevDetails.md, md2);
        const dl = calculateDogLeg(prevDetails.inc, i2, prevDetails.azi, a2).toFixed(2);
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
        console.log({ cl, dl, dls, rf, deltaMD, deltaTVD, tvd, deltaNS, deltaEW, ew, ns, vs });
        // const newSurvey = new survey({ md: md2, inc: i2, azi: a2, fieldNumber, cl, dl, dls, rf, tvd, ns, ew, vs });
        // await newSurvey.save();
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = saveToDatabase;