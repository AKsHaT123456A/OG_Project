
const constants = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    DATABASE_KEY: process.env.DATABASE_KEY,
    CRYPTO_SECRET_KEY: process.env.SECRET_KEY,
    CACHE_TTL: 7200000,
    WELL: {
        "mainHeading":9,
        "data": 4
    },
    WELLBORE: {
        "mainHeading": 10,
        "data": 4
    },
    FIELDNAME: {
        "mainHeading": 6,
        "data": 4
    },
    PLANREVSION:{
        "mainHeading": null,
        "data": null
    },
    UTM: {
        "mainHeading": null,
        "data": null
    },
    NORTHREFERENCE:{
        "mainHeading": 4,
        "data": 15
    },
    MAGNETICDECLINATION:{
        "mainHeading":16,
        "data":4
    },
    CONVERGENCE: {
        "mainHeading": 6,
        "data": 15
    },
    FIELDVERTICALREFERENCE: {
        "mainHeading":9 ,
        "data": 15
    },
    "ROTARYTOFIELD":{
        "mainHeading": 10,
        "data": 15
    },
    "ROTARYSUBSEA":{
        "mainHeading": 11,
        "data": 15
    },
    "ROTARYTOMHL":{
        "mainHeading": 12,
        "data": 15
    },
    "SECTIONX":{
        "mainHeading": 13,
        "data": 15
    },
    "SECTIONY":{
        "mainHeading": 14,
        "data": 15
    },
    "VERTICALSECTIONAZIMUTH":{
        "mainHeading": 16,
        "data": 15
    },
};

module.exports = constants;
