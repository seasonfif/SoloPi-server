var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    'name' : 'seasonfif',
    'age' : 29
  });
});

module.exports = router;
