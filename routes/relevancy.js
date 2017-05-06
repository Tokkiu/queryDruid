var express = require('express');
var router = express.Router();
var http = require('http');
var url = require('url');
var request = require('request');


/* GET /top listing. */
router.get('/:model/:city?', function(req, res, next) {
  query(req, res);
});

module.exports = router;

function query(req, res){
  var city = req.params.city;
  var model = req.params.model;
  var data = {
    "queryType": "groupBy",
    "dataSource": "demo",
    "granularity": "all",
    "dimensions": ["brand_a","model_a", "brand_b", "model_b"],
    "orderByColumnSpec": { "dimension": "count", "direction": "ascending", "dimensionOrder": ["strlen"] },
    "filter": {
      "type": "and",
      "fields": [
        // { "type": "selector", "dimension": "region", "value": "sh" },
        { "type": "selector", "dimension": "model_a", "value": model }
      ]
    },
    "aggregations": [
      {
         "type":"count",
         "name":"count"
      }
    ],
    "intervals": [ "2017-05-04T00:00:00.000/2017-05-06T00:00:00.000" ]
  };

  if (model === undefined) {
    res.send("error:no model");
  }
  if (city !== undefined) {
    data.filter.fields.push(
      { "type": "selector", "dimension": "region", "value": city }
    );
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
