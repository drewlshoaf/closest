//@input: zip, callback
//@output: null || json

const config = require("../config");
const async = require("async");

module.exports.exec = (zip, callback) => {
  async.mapSeries(
    global.zipdata,
    (record, callback) => {
      if (zip != record.zip) {
        //next
        callback(null);
      }
      if (zip === record.zip) {
        callback(record); //record found
      }
    },
    function(result) {
      callback(result); //done
    }
  );
};
