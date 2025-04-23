const fs = require('fs');
const path = require('path');
const root = require('./path.js');

function logRequest(req, resBody, statusCode, message) {
    const date = new Date().toISOString();
    let logMessage = `Date: ${date}\n` +
        `Requester IP: ${req.ip}\n` +
        `Request Method: ${req.method}\n` +
        `Request URL: ${req.originalUrl}\n` +
        `Request Query: ${JSON.stringify(req.query)}\n` +
        `Request Params: ${JSON.stringify(req.params)}\n` +
        `Message: ${message}\n` +
        `Status Code: ${statusCode}\n` +
        `Response Body: ${JSON.stringify(resBody)}\n` +
        `----------------------------------------\n`;
    fs.writeFileSync(path.join(root , `Resources` , `Logs/log-${date.replaceAll(':' , '-').replaceAll('.', '-')}`), logMessage);
    
}

module.exports = { logRequest };