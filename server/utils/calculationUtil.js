function calculateCourseLength(md1, md2) {
    return md2 - md1;
}

function calculateDogLeg(i1, i2, a1, a2) {
    const radI1 = (i1 * Math.PI) / 180;
    const radI2 = (i2 * Math.PI) / 180;
    const radA1 = (a1 * Math.PI) / 180;
    const radA2 = (a2 * Math.PI) / 180;
    console.log({ radI1, radI2, radA1, radA2 });
    console.log({ sinI1: Math.sin(radI1), sinI2: Math.sin(radI2), cosA2A1: Math.cos(radA2 - radA1), cosI1: Math.cos(radI1), cosI2: Math.cos(radI2) });
    const cose = (Math.sin(radI1) * Math.sin(radI2) * Math.cos(radA2 - radA1)) + (Math.cos(radI1) * Math.cos(radI2));
    console.log({ cose });
    const clampedValue = Math.max(-1, Math.min(1, cose));
    const dogLeg = (180 / Math.PI) * Math.acos(clampedValue);
    console.log({ dogLeg });
    return dogLeg;
}

function calculateDLS(dl, cl) {
    return (dl * 100) / cl;
}

function calculateRF(dl) {
    if (dl == 0 ) {
        return 1;
    }
    return Math.tan((dl / 2) * (Math.PI / 180)) * (180 / Math.PI) * (2 / dl);
}

function calculateDeltaTVD(i1, i2, rf, deltaMD) {
    const radI1 = (i1 * Math.PI) / 180;
    const radI2 = (i2 * Math.PI) / 180;
    console.log({ i1, i2, radI1, radI2, rf, deltaMD });
    return ((Math.cos(radI1) + Math.cos(radI2)) * rf * (deltaMD / 2));
}

function calculateDeltaNS(i1, i2, a1, a2, rf, md) {
    // Convert degrees to radians
    const i1Rad = i1 * (Math.PI / 180);
    const i2Rad = i2 * (Math.PI / 180);
    const a1Rad = a1 * (Math.PI / 180);
    const a2Rad = a2 * (Math.PI / 180);
    console.log({ rt: (Math.sin(i1Rad) * Math.cos(a1Rad)) + (Math.sin(i2Rad) * Math.cos(a2Rad)) });
    // Calculate the formula
    const result = ((Math.sin(i1Rad) * Math.cos(a1Rad)) + (Math.sin(i2Rad) * Math.cos(a2Rad))) * (rf * (md / 2));

    return result;
}
function calculateDeltaEW(i1, i2, a1, a2, rf, md) {
    // Convert degrees to radians
    const i1Rad = i1 * (Math.PI / 180);
    const i2Rad = i2 * (Math.PI / 180);
    const a1Rad = a1 * (Math.PI / 180);
    const a2Rad = a2 * (Math.PI / 180);

    // Calculate the formula
    const result = ((Math.sin(i1Rad) * Math.sin(a1Rad)) + (Math.sin(i2Rad) * Math.sin(a2Rad))) * (rf * (md / 2));
    return result;
}
function calculateVS(azimuthTarget, deltaNS, deltaEW) {
    const atanResult = Math.atan2(deltaEW, deltaNS);
    const atanResultDeg = (atanResult * 180) / Math.PI;
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
    const vs = cd * Math.cos((dd * Math.PI) / 180);

    return vs;
}


function customRound(value, precision) {
    const multiplier = Math.pow(10, precision);
    return value >= 0
        ? Math.ceil(value * multiplier) / multiplier
        : Math.floor(value * multiplier) / multiplier;
}

module.exports = { calculateCourseLength, calculateDogLeg, calculateDLS, calculateRF, calculateDeltaTVD, calculateDeltaNS, calculateDeltaEW, calculateVS, customRound };


//dision by zero dogleg=0 and rf =1
// rf will not be 1 if dogleg is greater than 0.15  