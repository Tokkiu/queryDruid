var express = require('express');
var router = express.Router();
var http = require('http');
var url = require('url');
var request = require('request');


/* GET /top listing. */
router.get('/:city?', function(req, res, next) {
  getSum(req, res);
});


module.exports = router;

function getSum(req, res){
  var limit = req.query.limit;
  var data = {
    "queryType": "groupBy",
    "dataSource": "demoRaw",
    "granularity": "all",
    "dimensions": ["brand"],
    "limitSpec": { "type": "default", "limit": parseInt(limit), "columns": ["brand", "count"] },
    "orderByColumnSpec": { "dimension": "count", "direction": "ascending", "dimensionOrder": ["strlen"] },
    "aggregations": [
      {
         "type":"count",
         "name":"count"
      }
    ],
    "intervals": [ "2017-05-04T00:00:00.000/2017-05-06T00:00:00.000" ]
  };

  var city = req.params.city;
  if (city !== undefined) {
    data.filter = {
      "type": "and",
      "fields": [
        { "type": "selector", "dimension": "region", "value": city }
      ]
    };
  }

  request({
    method: 'POST',
    uri: 'http://broker1:8082/druid/v2',
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
}
