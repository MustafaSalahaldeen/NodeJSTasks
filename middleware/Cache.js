const nodeCache = require('node-cache');
const { sendResponse } = require('./integrations.js');
const { default: axios } = require('axios');
require('dotenv').config({ path: './Resources/constants.env' });

const DEFAULT_ERROR_MESSAGE = process.env.DEFAULT_ERROR_MESSAGE;
const CACHE_CHECK_PERIOD = process.env.CACHE_CHECK_PERIOD;


const myCache = new nodeCache({ checkperiod: 120 });

const cahceMiddleware = async (url, params, headers, res, req) => {
    const key = url;
    const cachedResponse = myCache.get(key);
    if (cachedResponse){
        sendResponse(req, res, 200, cachedResponse);
    }
    else{
        const response = await axios.get(url, params, headers);
        sendResponse(req, res, 200, response.data);
        myCache.set(key, response.data);
    }
}

exports.cahceMiddleware = cahceMiddleware;