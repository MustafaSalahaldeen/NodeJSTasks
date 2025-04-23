const fs = require('fs');
const path = require('path');
const root = require('./path.js');

function logRequest(req, res, statusCode, message) {
    const date = new Date().toISOString();
    let logMessage = ` Date: ${date}\n` +
        `Requester IP: ${req.ip}\n` +
        `Request Method: ${req.method}\n` +
        `Request URL: ${req.originalUrl}\n` +
        `Status Code: ${statusCode}\n,` +
        `Message: ${message}\n` +
        `Response Body: ${JSON.stringify(res.body)}\n` +
        `----------------------------------------\n`;
    fs.writeFileSync(path.join(root , `Resources` , `Logs/log-${date.replaceAll(':' , '-').replaceAll('.', '-')}`), logMessage);
    
}

module.exports = { logRequest };