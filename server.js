

const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const sanitizeHTML = require('sanitize-html');
const sanitizePar = require('./middleware/sanitize');

const AppName = 'WeBuy';

app.use(express.json());
app.use(logger);

const PORT = 3000;

app.get('/', (request, response) => {
    const dateNow = new Date();
    response.send(`<h1> WeBuy </h1> <p>Current time: ${dateNow}</p>`);
});

app.get('/about', (request, response) => {
    response.send(`
        <h1> ${AppName} </h1>
        <h1> Sofia Fedorova</h1>
        <h1> Fall Term 2025 </h1>
    `);
});

app.get('/user/:name', sanitizePar, (request, response) => {
    response.send(`<h2>Hello, ${request.params.name}</h2>`);
});

app.use((theError, request, response, next) => {
    console.error("[ERROR]" + theError.message);
    const theStatus = theError.status || 500;
    response.status(theStatus).json({
        issue: "So sorry, we detected the following error" + theError.message
    });
});

app.listen(PORT, () => {
    console.log('Web server currently listening on port');
});
