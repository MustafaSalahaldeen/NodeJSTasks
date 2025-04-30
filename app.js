const express = require('express');
const functions = require('./Middleware/Integrations.js');
const dataManipulation = require('./Middleware/DataManipulation.js');
const cache = require('./Middleware/Cache.js');
const limiter = require('./Middleware/Limiter.js');
require('dotenv').config({ path: './Resources/constants.env' });

const PORT = process.env.PORT;  
const APIS = JSON.parse(process.env.APIS);
const DEFAULT_ERROR_MESSAGE = process.env.DEFAULT_ERROR_MESSAGE;

const app = express();

app.use(limiter.limit);

const booksAPI = APIS.find(api => api.name === 'books');
app.get(`/api/${booksAPI.name}`, async (req, res) => {
    const config = booksAPI.config;
    const params = dataManipulation.configureObjects(config.params, req.query);
    const response = await functions.callAPI(config.endpoint, config.method, params, config.headers, res, req);
});

const estimateAge = APIS.find(api => api.name === 'estimate_age');
app.get(`/api/${estimateAge.name}`, async (req, res) => {
    const config = estimateAge.config;
    const params = dataManipulation.configureObjects(config.params, req.query);
    const response = await functions.callAPI(config.endpoint, config.method, params, config.headers, res, req);
});

const randomCatImages = APIS.find(api => api.name === 'cats');
app.post(`/api/${randomCatImages.name}`, async (req, res) => {
    const config = randomCatImages.config;
    const params = dataManipulation.configureObjects(config.params, req.params);
    const response = await functions.callAPI(config.endpoint, config.method, params, config.headers, res, req);
});

app.use('{*splat}', (req, res,next) => {
   functions.sendResponse(req, res, 404, DEFAULT_ERROR_MESSAGE);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});