const axios = require('axios');
const logging = require('./Logging.js');

async function callAPI(url, method, params, headers, req, res) {
    const error = {};
    if (url === undefined || url === null) {
        sendResponse(req, res, 400, "URL is required");
    }

    if (method === undefined || method === null) {
        sendResponse(req, res, 400, "Method is required");
    }

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
        const response = await axios.get(`${url}${paramsString}`, params, headers)
        sendResponse(req, res, 200, response.data); 
    }

    else if (method.toUpperCase() === "POST") {
        const response = await axios.post(url, params, headers)
        sendResponse(req, res, 200, response.data); 
    }
    else if (method.toUpperCase() === "PUT") {
        const response = await axios.put(url, params, headers)
        sendResponse(req, res, 200, response.data); 
    }
    else if (method.toUpperCase() === "DELETE") {
        const response = await axios.delete(url, params, headers)
        sendResponse(req, res, 200, response.data); 
    }
    else {
        sendResponse(res, 400, "Invalid method. Use GET, POST, PUT or DELETE.");
    }

}

function sendResponse(req, res, statusCode, message) {
    const responseBody = {};
    responseBody['message'] = message;
    responseBody['code'] = statusCode;
    res.header('Content-Type', 'application/json');
    res.status(statusCode).send(responseBody);
    logging.logRequest(req, res, statusCode, message);
}

module.exports = { callAPI, sendResponse};