var express = require('express');
var search = express.Router();
var http = require('http');
var config = require('../conf/config');
var url = require("url");

search.use(function(req, res, next){

    /* immediate handler */
    var reqJson = {
        "queryType" : "search",
        "dataSource" : "superdemo",
        "granularity" : "all",
        "searchDimensions" : [
        "userid"
        ], 
        "query": {
            "type": "insensitive_contains",
            "value": "10"
        },
        "sort" : {
            "type": "lexicographic"
        },
        "intervals": ["2017-01-01/2017-01-10"]
    };
    req = reqJson;

    /* time log */
    console.log("Time:" + Date.now());

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