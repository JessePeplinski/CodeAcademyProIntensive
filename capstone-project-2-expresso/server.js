const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');

const app = express();

const apiRouter = require('./api/api');

app.use(bodyParser());
app.use(cors());
app.use(errorhandler());

app.use('/api', apiRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening: ${PORT}`);
});

module.exports = app;