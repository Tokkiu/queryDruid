var express = require('express');
var router = express.Router();
var http = require('http');
var url = require('url');
var request = require('request');
var Druid = require('druid-query')
  , Client = Druid.Client
  , Query = Druid.Query
  , client = new Client('http://127.0.0.1:8082');


/* GET /top listing. */
router.get('/', function(req, res, next) {
  var resJ = {};
  var date = new Date();
  resJ.queryType = "relevancy";
  resJ.timestamp = date.getTime();
  resJ.data = [];
  var brands = ["本田","日产","大众","雪福来","现代","别克","奇瑞","福特","马自达","奥迪"];
  for (var i = 0; i < 5; i++) {
    resJ.data.push({
      "brand" : brands[i],
      "salesNum" : getSalesNum(i)
    });
  }


var data = {
  "queryType": "timeseries",
  "dataSource": "demo1",
  "granularity": "all",
  // "dimensions":[
  //     "user"
  //  ],
   "aggregations":[
      {
         "type":"count",
         "name":"count"
      }
   ],
  "descending": "true",
  "intervals": [ "2017-05-04T00:00:00.000/2017-05-06T00:00:00.000" ]
};



request({
  method: 'POST',
  uri: 'http://127.0.0.1:8082/druid/v2',
  json: true,
  body: data
},
function (error, response, body) {
  if (error) {
    return console.error('upload failed:', error);
  }
  console.log('Upload successful!  Server responded with:', body);
  console.log(response);
  res.send(body);
})




});

module.exports = router;

function getSalesNum(index){
  return (Math.floor(Math.random() * 10) + index * 10);
}
