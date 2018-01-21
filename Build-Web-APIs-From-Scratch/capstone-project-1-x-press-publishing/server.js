const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(errorhandler());

const apiRouter = require('./api/api');
app.use('/api', apiRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = app;