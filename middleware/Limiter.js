const limiter = require('express-rate-limit');
require('dotenv').config({ path: './Resources/constants.env' });

const LIMIT_TIME = process.env.LIMIT_TIME;
const LIMIT_REQUESTS_NUMBER = process.env.LIMIT_REQUESTS_NUMBER;
const LIMIT_EXCEED_MESSAGE = process.env.LIMIT_EXCEED_MESSAGE;

let numberOfHits = LIMIT_REQUESTS_NUMBER;

const limit = limiter({
    windowMs: LIMIT_TIME * 1000,
    max: LIMIT_REQUESTS_NUMBER,
    currentDate: new Date(),
    message: {
        "message": LIMIT_EXCEED_MESSAGE,
        "code": 429
    },
    handler: (req, res, next, options) => {
        const retryAfter = Math.max(1 , Math.ceil((LIMIT_TIME * 1000 - (new Date() - options.currentDate)) / 1000));
        res.status(options.statusCode).json({
            message: options.message.message.replace('{time}', `${retryAfter}`),
            code: options.message.code,
            retryAfter: retryAfter
        });
        numberOfHits = LIMIT_REQUESTS_NUMBER;
    }
});

exports.limit = limit;
exports.numberOfHits = numberOfHits;