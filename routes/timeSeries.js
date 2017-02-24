var express = require('express');
var search = express.Router();
var http = require('http');
var config = require('../conf/config');
var url = require("url");

search.use(function(req, res, next){

    /* time log */
    console.log("Time:" + Date.now());

    /* http log*/
    console.log("Url:" + req.originalUrl);

    /* immediate handler */
    var reqJson = {
        "queryType": "timeseries",
        "dataSource": "superdemo",
        "granularity": "day",
        "descending": "true",
        "filter": {
            "type": "and",
            "fields": [
            { "type": "or",
                "fields": [
                { "type": "selector", "dimension": "count", "value": "111" },
                { "type": "selector", "dimension": "count", "value": "101" }
                ]
            }
            ]
        },
        "intervals": [ "2017-01-01T00:00:00.000/2017-01-13T00:00:00.000" ]

    };
    req = reqJson;

    next();
});


search.get('/',function(req, res, next){
    var result;
    var options = url.parse(config.druidUrl);
    options.method = "post";
    
    /* send query request , waitting for response */
    var query = http.request(options,(response) => {
        
        response.on("data",(chunk) => {
            result += chunk;
        });

        response.on("end",(chunk) => {
            res.send(response);
        });
    });

    query.end();
     
});

module.exports = search;