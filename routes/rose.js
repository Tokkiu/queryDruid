var express = require('express');
var router = express.Router();

/* GET /top listing. */
router.get('/', function(req, res, next) {
  var resJ = {};
  var date = new Date();
  resJ.queryType = "roseGraph";
  resJ.timestamp = date.getTime();
  resJ.data = [];
  var brands = ["本田","日产","大众","雪福来","现代","别克","奇瑞","福特","马自达","奥迪"];
  for (var i = 0; i < 10; i++) {
    resJ.data.push({
      "brand" : brands[i],
      "salesNum" : getSalesNum(i)
    });
  }
  res.send(resJ);
});

module.exports = router;

function getSalesNum(index){
  return (Math.floor(Math.random() * 10) + index * 10);
}
