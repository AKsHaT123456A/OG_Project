
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
    "LOCALNORTHSLOTLOCATION":{
        "mainHeading": 22,
        "data": 4
    },
    "LOCALEASTSLOTLOCATION":{
        "mainHeading": 22,
        "data": 6
    },
    "GRIDEASTSLOTLOCATION":{
        "mainHeading": 22,
        "data": 8
    },
    "GRIDNORTHSLOTLOCATION":{
        "mainHeading": 22,
        "data": 10
    },
    "LATITUDESLOTLOCATION":{
        "mainHeading": 22,
        "data": 12
    },
    "LONGITUDESLOTLOCATION":{
        "mainHeading": 22,
        "data": 14
    },
    "HORZSLOTLOCATION":{
        "mainHeading": 22,
        "data": 16
    },
    "VERTSLOTLOCATION":{
        "mainHeading": 22,
        "data": 18
    },
    "LOCALNORTHFACILITYREFERENCEPOINT":{
        "mainHeading": 23,
        "data": 4
    },
    "LOCALEASTFACILITYREFERENCEPOINT":{
        "mainHeading": 23,
        "data": 6
    },
    "GRIDEASTFACILITYREFERENCEPOINT":{
        "mainHeading": 23,
        "data": 8
    },
    "GRIDNORTHFACILITYREFERENCEPOINT":{
        "mainHeading": 23,
        "data": 10
    },
    "LATITUDEFACILITYREFERENCEPOINT":{
        "mainHeading": 23,
        "data": 12
    },
    "LONGITUDEFACILITYREFERENCEPOINT":{
        "mainHeading": 23,
        "data": 14
    },
    "HORZFACILITYREFERENCEPOINT":{
        "mainHeading": 23,
        "data": 16
    },
    "VERTFACILITYREFERENCEPOINT":{
        "mainHeading": 23,
        "data": 18
    },
    "LOCALNORTHFIELDREFERENCEPOINT":{
        "mainHeading": 24,
        "data": 4
    },
    "LOCALEASTFIELDREFERENCEPOINT":{
        "mainHeading": 24,
        "data": 6
    },
    "GRIDEASTFIELDREFERENCEPOINT":{
        "mainHeading": 24,
        "data": 8
    },
    "GRIDNORTHFIELDREFERENCEPOINT":{
        "mainHeading": 24,
        "data": 10
    },
    "LATITUDEFIELDREFERENCEPOINT":{
        "mainHeading": 24,
        "data": 12
    },
    "LONGITUDEFIELDREFERENCEPOINT":{
        "mainHeading": 24,
        "data": 14
    },
    "HORZFIELDREFERENCEPOINT":{
        "mainHeading": 24,
        "data": 16
    },
    "VERTFIELDREFERENCEPOINT":{
        "mainHeading": 24,
        "data": 18
    },
};

module.exports = constants;
