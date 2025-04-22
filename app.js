const express = require('express');
const APIs = require('./APIs.js');

const app = express();

app.get('/api/books', async (req, res) => {
    const { title } = req.query;
    const response = await APIs.callAPI('https://openlibrary.org/search.json', 'GET', { "q": title }, {});
    res.header('Content-Type', 'application/json');
    res.send(response);
    console.log('next response');
});

app.get('/api/anime', async (req, res) => {
    const { title } = req.query;
    const response = await APIs.callAPI('https://openlibrary.org/search.json', 'GET', { "q": title }, {});
    res.header('Content-Type', 'application/json');
    res.send(response);
    console.log('next response');
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});