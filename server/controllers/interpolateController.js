const interpolate = require("../models/interpolateModel");
const WellPlannedExcelModel = require("../models/wellPlannedSchema");
const {
    calculateRF,
    calculateDeltaTVD,
    calculateDeltaEW,
    calculateDeltaNS
} = require("../utils/calculationUtil");

const interpolateController = async (req, res) => {
    const { md, excelName } = req.body;
    const { id } = req.query;

    try {
        const prevInter = await interpolate.findOne({ md, excelName, userId: id });

        if (prevInter) {
            return res.status(400).json({ ...prevInter.toObject() });
        }

        const [station1, station2] = await Promise.all([
            WellPlannedExcelModel.findOne({ md: { $lte: md }, excelName })
                .sort({ md: -1 })
                .limit(1)
                .select('md inc azi tvd east north -_id'),
            WellPlannedExcelModel.findOne({ md: { $gte: md }, excelName })
                .sort({ md: 1 })
                .limit(1)
                .select('md dls buildrate turnrate -_id')
        ]);
        const brX = parseFloat(station2.buildrate) / 100;
        const trX = parseFloat(station2.turnrate) / 100;

        const inc1 = (station1.inc + brX * (md - station1.md));
        const aziX = station1.azi + trX * (md - station1.md);
        const dlX = station2.dls * (station2.md - station1.md);
        const rf = calculateRF(dlX);
        const incX = inc1.toFixed(2);
        const deltaTVD = calculateDeltaTVD(station1.inc, incX, rf, md - station1.md);
        const deltaEW = calculateDeltaEW(station1.inc, incX, station1.azi, aziX, rf, md - station1.md);
        const deltaNS = calculateDeltaNS(station1.inc, incX, station1.azi, aziX, rf, md - station1.md);
        const tvd = parseFloat((deltaTVD + station1.tvd));
        const ew = parseFloat((deltaEW + station1.east).toFixed(2));
        const ns = parseFloat((deltaNS + station1.north).toFixed(2));

        const interpolatedData = {
            md,
            tvd,
            ew,
            ns,
            inc: parseFloat(incX),
            azi: parseFloat(aziX.toFixed(2)),
            rf,
            excelName,
            userId: id
        };

        await interpolate.create(interpolatedData);

        return res.json(interpolatedData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getInterpolate = async (req, res) => {
    try {
        const { excelName, id } = req.query;
        const interpolateData = await interpolate.find({ excelName, userId: id });
        return res.status(200).json({ interpolateData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

module.exports = { interpolateController, getInterpolate };
