var express = require('express');
var router = express.Router();
const flightsRouter = require('./flights');

router.use('/api', flightsRouter);


module.exports = router;
