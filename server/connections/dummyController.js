const parseConstants =
{
    "PARSING": {
        mainHeading1: 40,
        mainHeading2: 231,
        data: 20
    }
}

module.exports = parseConstants


//for multiple upload
const uploadSurvey = async (req, res) => {
    const { logName } = req.body;
    const userId = req.query.id;
    const well = "SB-978";

    for (let i = 0; i < surveyData.length; i++) {
        const { MD, Inclination, Azimuth } = surveyData[i];
        const fieldNumber = i + 1;

        const { verticalSectionAzimuth } = await detail
            .findOne({ well })
            .select("verticalSectionAzimuth");
        const angleWithoutDegree = verticalSectionAzimuth.replace(/°/g, '');

        const prevSurvey = await survey.findOne({ fieldNumber, userId, logName });
        if (prevSurvey) {
            console.log(`Survey ${fieldNumber} already exists`);
        }

        if (fieldNumber === 1) {
            const prevDetails = { md: 0, inc: 0, azi: 0, tvd: 0, ns: 0, ew: 0 };
            const surveyDetails = await saveToDatabase(
                prevDetails,
                MD,
                Inclination,
                Azimuth,
                fieldNumber,
                angleWithoutDegree,
                logName,
                userId
            );

            if (surveyDetails.bool) {
                console.log(`Survey ${fieldNumber} received`);
            }
        } else {
            const prevFieldNumber = fieldNumber - 1;
            const {
                md: prevMd,
                inc: prevInc,
                azi: prevAzi,
                tvd,
                ns,
                ew,
            } = await survey
                .findOne({ fieldNumber: prevFieldNumber })
                .select("md inc azi tvd ns ew");

            const prevDetails = { md: prevMd, inc: prevInc, azi: prevAzi, tvd, ns, ew };
            const surveyDetails = await saveToDatabase(
                prevDetails,
                MD,
                Inclination,
                Azimuth,
                fieldNumber,
                angleWithoutDegree,
                logName,
                userId
            );

            if (surveyDetails.bool) {
                console.log(`Survey ${fieldNumber} received`);
            }
        }
    }
};