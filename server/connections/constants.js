
const constants = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    DATABASE_KEY: process.env.DATABASE_KEY,
    CRYPTO_SECRET_KEY: process.env.SECRET_KEY,
    CACHE_TTL: 7200000,
    WELL: {
        "mainHeading": 9,
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
    PLANREVSION: {
        "mainHeading": null,
        "data": null
    },
    UTM: {
        "mainHeading": null,
        "data": null
    },
    NORTHREFERENCE: {
        "mainHeading": 4,
        "data": 15
    },
    MAGNETICDECLINATION: {
        "mainHeading": 16,
        "data": 4
    },
    CONVERGENCE: {
        "mainHeading": 6,
        "data": 15
    },
    FIELDVERTICALREFERENCE: {
        "mainHeading": 9,
        "data": 15
    },
    "ROTARYTOFIELD": {
        "mainHeading": 10,
        "data": 15
    },
    "ROTARYSUBSEA": {
        "mainHeading": 11,
        "data": 15
    },
    "ROTARYTOMHL": {
        "mainHeading": 12,
        "data": 15
    },
    "SECTIONX": {
        "mainHeading": 13,
        "data": 15
    },
    "SECTIONY": {
        "mainHeading": 14,
        "data": 15
    },
    "VERTICALSECTIONAZIMUTH": {
        "mainHeading": 16,
        "data": 15
    },
    "SLOTLOCATION": {field:[
        {
            localNorth: { mainHeading: 22, data: 4 },
            localEast: { mainHeading: 22, data: 6 },
            gridEast: { mainHeading: 22, data: 8 },
            gridNorth: { mainHeading: 22, data: 10 },
            latitude: { mainHeading: 22, data: 12 },
            longitude: { mainHeading: 22, data: 14 },
            horz: { mainHeading: 22, data: 16 },
            vert: { mainHeading: 22, data: 18 }
        }
    ]},
    "FACILITYREFERENCEPOINT": [
        {
            localNorth: { mainHeading: 23, data: 4 },
            localEast: { mainHeading: 23, data: 6 },
            gridEast: { mainHeading: 23, data: 8 },
            gridNorth: { mainHeading: 23, data: 10 },
            latitude: { mainHeading: 23, data: 12 },
            longitude: { mainHeading: 23, data: 14 },
            horz: { mainHeading: 23, data: 16 },
            vert: { mainHeading: 23, data: 18 }
        }
    ],
    "FIELDREFERENCEPOINT": [
        {
            localNorth: { mainHeading: 24, data: 4 },
            localEast: { mainHeading: 24, data: 6 },
            gridEast: { mainHeading: 24, data: 8 },
            gridNorth: { mainHeading: 24, data: 10 },
            latitude: { mainHeading: 24, data: 12 },
            longitude: { mainHeading: 24, data: 14 },
            horz: { mainHeading: 24, data: 16 },
            vert: { mainHeading: 24, data: 18 }
        }
    ]
};

module.exports = constants;
