var express = require('express');
var router = express.Router();
var base = 0;

/* GET /sum listing. */
router.get('/', function(req, res, next) {
  var resJ = {};
  var date = new Date();
  resJ.queryType = "sum";
  resJ.timestamp = date.getTime();
  resJ.sum = getSalesNum();
  res.send(resJ);
});

module.exports = router;

function getSalesNum(){
  base += Math.floor(Math.random() * 2000);
  return base + 30000;
}
