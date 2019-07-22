//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//name: zip to geo store
//purpose: given a zip code, looks in local storage for geocode
//@in: zip, string
//@out: geocode in JSON
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

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
