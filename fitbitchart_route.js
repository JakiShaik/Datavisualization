var express = require('express');
var router = express.Router();
var models = require('../models');
var utilSystem = require('../util/utilSystemId');
var utilAuth = require('../util/utilAuth');
var async = require('async');




router.get('/', function (req, res, next) {
    subjectId = req.query.subjectId;
    if (subjectId == undefined) {
        subjectId = null;
      }
    if (subjectId) {
        drawchart(res,subjectId);
        //,function () {
           // res.render('fitbitplot',{dates: result});
        //});
        
    }
    else {
        err = {};
        err.message = 'Subject Not Found';
        return next(err);
      }
});
function drawchart(res,subjectId) {
    models.Chart.getSteps(subjectId, (err, result) => {
        //if (err) return callback(err);
        var steps = [];
        var date = [];
        for(var i =0; i<result.length;i++) {
            steps.push(result[i].FITBITSTEPS);
            date.push(result[i].ONDATE);
        }
        if (result.length != 0) {
            res.render('fitbitplot',{dates: date,steps: steps});
        }
        else {
            console.log("itsssss here");
            res.render('error');
          //callback();
        };
      });
}

  
  
module.exports = router;
