function calculateCourseLength(md1, md2) {
    return md2 - md1;
}

function calculateDogLeg(i1, i2, a1, a2) {
    const radI1 = (i1 * Math.PI) / 180;
    const radI2 = (i2 * Math.PI) / 180;
    const radA1 = (a1 * Math.PI) / 180;
    const radA2 = (a2 * Math.PI) / 180;

    const dogLeg = (180 / Math.PI) * Math.acos(
        (Math.sin(radI1) * Math.sin(radI2) * Math.cos(radA2 - radA1)) +
        (Math.cos(radI1) * Math.cos(radI2))
    );
    return dogLeg;
}

function calculateDLS(dl, cl) {
    return (dl * 100) / cl;
}

function calculateRF(dl) {
    return Math.tan((dl / 2) * (Math.PI / 180)) * (180 / Math.PI) * (2 / dl);
}

function calculateDeltaTVD(i1, i2, rf, deltaMD) {
    const radI1 = (i1 * Math.PI) / 180;
    const radI2 = (i2 * Math.PI) / 180;
    console.log({ i1, i2, radI1, radI2, rf, deltaMD });
    return Math.round((Math.cos(radI1) + Math.cos(radI2)) * rf * (deltaMD / 2));
}

function calculateDeltaNS(i1, i2, a1, a2, rf, deltaMD) {
    const radI1 = (i1 * Math.PI) / 180;
    const radI2 = (i2 * Math.PI) / 180;
    const radA1 = (a1 * Math.PI) / 180;
    const radA2 = (a2 * Math.PI) / 180;

    const deltaNS = (Math.sin(radI1) * Math.cos(radA1) + Math.sin(radI2) * Math.cos(radA2)) * rf * (deltaMD / 2);
    return deltaNS;
}

function calculateDeltaEW(i1, i2, a1, a2, rf, deltaMD) {
    const radI1 = (i1 * Math.PI) / 180;
    const radI2 = (i2 * Math.PI) / 180;
    const radA1 = (a1 * Math.PI) / 180;
    const radA2 = (a2 * Math.PI) / 180;

    const deltaEW = (Math.sin(radI1) * Math.sin(radA1) + Math.sin(radI2) * Math.sin(radA2)) * rf * (deltaMD / 2);
    return deltaEW;
}

function calculateVS(azimuthTarget, deltaNS, deltaEW) {
    const atanResult = Math.atan2(deltaEW, deltaNS);

    const atanResultDeg = Math.round((atanResult * 180) / Math.PI);
    let ca;

    if (azimuthTarget >= 0 && azimuthTarget < 90) {
        ca = atanResultDeg;
    } else if (azimuthTarget >= 90 && azimuthTarget < 180) {
        ca = 180 - atanResultDeg;
    } else if (azimuthTarget >= 180 && azimuthTarget < 270) {
        ca = 180 + atanResultDeg;
    } else if (azimuthTarget >= 270 && azimuthTarget < 360) {
        ca = 360 - atanResultDeg;
    } else {
        throw new Error("Invalid azimuth target");
    }

    const cd = Math.sqrt(deltaNS ** 2 + deltaEW ** 2);
    const dd = azimuthTarget - ca;
    const vs = cd * Math.cos(dd);

    return vs;
}




module.exports = { calculateCourseLength, calculateDogLeg, calculateDLS, calculateRF, calculateDeltaTVD, calculateDeltaNS, calculateDeltaEW, calculateVS }