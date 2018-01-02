var db = require('mysql2-db');
var async = require('async');
var cfg, models;

function init(_cfg, _models, callback) {
  cfg = _cfg;
  models = _models;
  callback();
}

function getSteps(subjectid,callback) {
    //var stage = db.stage(cfg);
    db.stage(cfg).query("select FITBITSTEPS,ONDATE from fitbitresponse where SUBJECTID=?", [subjectid]).finale((err, results) => {
        if (err) return callback(err);
        else return callback(null,results);
});

}

module.exports = {
    init: init,
    getSteps: getSteps
}
