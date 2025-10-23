

const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const sanitizeHTML = require('sanitize-html');
const sanitize = require('./middleware/sanitize');

const AppName = 'WeBuy';




app.use(express.json());
app.use(logger);


const PORT = 3000;


app.get('/' , (req, res) => {

const dateNow = new Date();

 res.send(`<h1> WeBuy </h1> <p>Current time: ${dateNow}</p>`)
});

app.get('/about' , (req, res) => {
    res.send(
        `<h1> ${AppName} </h1>
        <h1> Sofia Fedorova</h1>
        <h1> Fall Term 2025 </h1>`
        )

}) 


app.get('/user/:name', sanitize, (req, res) => {
    res.send(`Hello, ${req.params.name}`);
  });


app.use((theError, request, response, next) => {
    console.error("[ERROR]" + theError.message)
    const theStatus = theError.status || 500;
    response.status(theStatus).json({issue: "So sorry, we detected the following error" +
        theError.message });
})

app.listen(PORT, () => {
    console.log('Web server currently listening on port');
})