var express = require('express');
var router = express.Router();

router.post('/api/data', function(req, res, next) {
  const data = req.body;
  res.json({
    message: 'Datos recibidos',
    data
  });
});

module.exports = router;
