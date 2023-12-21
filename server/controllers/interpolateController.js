const interpolate = require("../models/interpolateModel");
const WellPlannedExcelModel = require("../models/wellPlannedSchema");
const { calculateRF, calculateDeltaTVD, calculateDeltaEW, calculateDeltaNS } = require("../utils/calculationUtil");

const interpolateController = async (req, res) => {
    try {
        const { md, excelName } = req.body;
        const { id } = req.query;

        const prevInter = await interpolate.findOne({ md, excelName, userId: id });
        if (prevInter) {
            return res.status(400).json({ ...prevInter._doc });
        }
        const station1Array = await WellPlannedExcelModel.find({ md: { $lte: md } }).sort({ md: -1 }).limit(1);
        const station2Array = await WellPlannedExcelModel.find({ md: { $gt: md } }).sort({ md: 1 }).limit(1);
        const station1 = station1Array[0];
        const station2 = station2Array[0];
        const brX = parseFloat(station2.buildrate) / 100;
        const trX = parseFloat(station2.turnrate) / 100;

        const incX = parseFloat(station1.inc) + brX * (md - parseFloat(station1.md));
        const aziX = parseFloat(station1.azi) + trX * (md - parseFloat(station1.md));
        const dlX = parseFloat(station2.dls) * (parseFloat(station2.md) - parseFloat(station1.md));
        const rf = calculateRF(dlX);

        const deltaTVD = calculateDeltaTVD(parseFloat(station1.inc), incX, rf, md - parseFloat(station1.md));
        const deltaEW = calculateDeltaEW(parseFloat(station1.inc), incX, parseFloat(station1.azi), aziX, rf, md - parseFloat(station1.md));
        const deltaNS = calculateDeltaNS(parseFloat(station1.inc), incX, parseFloat(station1.azi), aziX, rf, md - parseFloat(station1.md));

        const tvd = parseFloat((deltaTVD + parseFloat(station1.tvd)).toFixed(2));
        const ew = parseFloat((deltaEW + parseFloat(station1.east)).toFixed(2));
        const ns = parseFloat((deltaNS + parseFloat(station1.north)).toFixed(2));

        await interpolate.create({ md, tvd, ew, ns, inc: parseFloat(incX.toFixed(2)), azi: parseFloat(aziX.toFixed(2)), rf, excelName, userId: id });

        return res.json({ md, tvd, ew, ns, inc: parseFloat(incX.toFixed(2)), azi: parseFloat(aziX.toFixed(2)), rf });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getInterpolate = async (req, res) => {
    try {
        const { excelName, id } = req.query;
        const interpolateData = await interpolate.find({ excelName, userId: id });
        return res.status(200).json({ interpolateData });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

const findClosestMD = (mdArray, targetMD) => {
    if (mdArray.length === 0) {
        return null;
    }

    return mdArray.reduce((closest, current) => {
        const closestDiff = Math.abs(closest.md - targetMD);
        const currentDiff = Math.abs(current.md - targetMD);

        return currentDiff < closestDiff ? current : closest;
    });
};

module.exports = { interpolateController, getInterpolate };
