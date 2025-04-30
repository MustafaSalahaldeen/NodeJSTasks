const logging = require('./Logging.js');
const cahce = require('./Cache.js');
const limiter = require('./Limiter.js');

async function callAPI(url, method, params, headers, res, req) {
    const error = {};
    limiter.numberOfHits -= 1;
    if (url === undefined || url === null) {
        sendResponse(req, res, 400, "URL is required");
    }

    if (method === undefined || method === null) {
        sendResponse(req, res, 400, "Method is required");
    }

    if (method.toUpperCase() === "GET" || method.toUpperCase() === "POST" || method.toUpperCase() === "PUT" || method.toUpperCase() === "DELETE") {
        if (method.toUpperCase() === "GET") {
            var paramsString = '';
            for ([key, value] of Object.entries(params)) {
                if (key && value) {
                    if (!paramsString)
                        paramsString += `?${key}=${value}`;
                    else
                        paramsString += `&${key}=${value}`;
                }
            }
            url = `${url}${paramsString}`;
        }
        cahce.cahceMiddleware(url, params, headers, res, req);

    }
}

function sendResponse(req, res, statusCode, message) {
    const responseBody = {};
    responseBody['message'] = message;
    responseBody['code'] = statusCode;
    responseBody['numberOfHits'] = limiter.numberOfHits;
    res.header('Content-Type', 'application/json');
    res.status(statusCode).send(responseBody);
    logging.logRequest(req, responseBody, statusCode, message);
}

module.exports = { callAPI, sendResponse };