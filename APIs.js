const axios = require('axios');

async function callAPI(url, method, params, headers) {
    if (url === undefined || url === null) {
        throw new Error("URL is required");
    }

    if (method === undefined || method === null) {
        throw new Error("Method is required");
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
        return response.data;
    }

    else if (method.toUpperCase() === "POST") {
        const response = await axios.post(url, params, headers)
        return response.data;
    }
    else if (method.toUpperCase() === "PUT") {
        const response = await axios.put(url, params, headers)
        return response.data;
    }
    else if (method.toUpperCase() === "DELETE") {
        const response = await axios.delete(url, params, headers)
        return response.data;
    }
    else {
        throw new Error("Invalid method. Use GET, POST, PUT or DELETE.");
    }

}

module.exports = { callAPI };