var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Influencer - The Young Internet');
});

module.exports = router;
