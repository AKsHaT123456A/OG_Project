
const constants = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    DATABASE_KEY: process.env.DATABASE_KEY,
    CRYPTO_SECRET_KEY: process.env.SECRET_KEY,
    CACHE_TTL: 7200000,
    WELLBORE:{
        "header":1,
        "data":2
    },
    WELL:{
        "header":5,
        "data":6
    },
    INSTALLATION:{
        "header":13,
        "data":14
    },
    FIELD:{
        "header":17,
        "data":18
    },
    SLOT:{
        "header":9,
        "data":10
    }
};

module.exports = constants;
