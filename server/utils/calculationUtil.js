const DEG_TO_RAD = Math.PI / 180;

function calculateCourseLength(md1, md2) {
    return md2 - md1;
}

function calculateDogLeg(i1, i2, a1, a2) {
    const radI1 = i1 * DEG_TO_RAD;
    const radI2 = i2 * DEG_TO_RAD;
    const radA1 = a1 * DEG_TO_RAD;
    const radA2 = a2 * DEG_TO_RAD;

    const cose = Math.max(-1, Math.min(1, Math.sin(radI1) * Math.sin(radI2) * Math.cos(radA2 - radA1) + Math.cos(radI1) * Math.cos(radI2)));
    const clampedValue = Math.acos(cose);
    return (180 / Math.PI) * clampedValue;
}

function calculateDLS(dl, cl) {
    return cl === 0 ? 0 : (dl * 100) / cl;
}

function calculateRF(dl) {
    return dl === 0 ? 1 : Math.tan((dl / 2) * DEG_TO_RAD) * (180 / Math.PI) * (2 / dl);
}

function calculateDeltaTVD(i1, i2, rf, deltaMD) {
    const radI1 = i1 * DEG_TO_RAD;
    const radI2 = i2 * DEG_TO_RAD;
    const ra = radI1.toFixed(2);
    const rb = radI2.toFixed(2);
    return ((Math.cos(ra) + Math.cos(rb)) * rf * (deltaMD / 2));
}

function calculateDeltaNS(i1, i2, a1, a2, rf, md) {
    const i1Rad = i1 * DEG_TO_RAD;
    const i2Rad = i2 * DEG_TO_RAD;
    const a1Rad = a1 * DEG_TO_RAD;
    const a2Rad = a2 * DEG_TO_RAD;
    return ((Math.sin(i1Rad) * Math.cos(a1Rad)) + (Math.sin(i2Rad) * Math.cos(a2Rad))) * (rf * (md / 2));
}

function calculateDeltaEW(i1, i2, a1, a2, rf, md) {
    const i1Rad = i1 * DEG_TO_RAD;
    const i2Rad = i2 * DEG_TO_RAD;
    const a1Rad = a1 * DEG_TO_RAD;
    const a2Rad = a2 * DEG_TO_RAD;
    return ((Math.sin(i1Rad) * Math.sin(a1Rad)) + (Math.sin(i2Rad) * Math.sin(a2Rad))) * (rf * (md / 2));
}

function calculateVS(azimuthTarget, deltaNS, deltaEW) {
    const atanResultDeg = (Math.atan2(deltaEW, deltaNS) * 180) / Math.PI;

    let ca;

    switch (true) {
        case azimuthTarget >= 0 && azimuthTarget < 90:
            ca = atanResultDeg;
            break;
        case azimuthTarget >= 90 && azimuthTarget < 180:
            ca = 180 - atanResultDeg;
            break;
        case azimuthTarget >= 180 && azimuthTarget < 270:
            ca = 180 + atanResultDeg;
            break;
        case azimuthTarget >= 270 && azimuthTarget < 360:
            ca = 360 - atanResultDeg;
            break;
        default:
            throw new Error("Invalid azimuth target");
    }

    const cd = Math.sqrt(deltaNS ** 2 + deltaEW ** 2);
    const dd = azimuthTarget - ca;
    return cd * Math.cos((dd * DEG_TO_RAD));
}

function customRound(value, precision) {
    const multiplier = Math.pow(10, precision);
    return value >= 0 ? Math.ceil(value * multiplier) / multiplier : Math.floor(value * multiplier) / multiplier;
}

module.exports = { calculateDogLeg, calculateDLS, calculateRF, calculateDeltaTVD, calculateDeltaNS, calculateDeltaEW, calculateVS, customRound, calculateCourseLength };
