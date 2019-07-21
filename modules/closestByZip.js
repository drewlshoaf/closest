const async = require("async");
const zipToGeoStore = require("./zipToGeoStore");
const zipToGeoSvc = require("./zipToGeoSvc");

module.exports.exec = (zip, callback) => {
  //needs to run 1st in a series if multi sources
  let geoStore = callback => {
    zipToGeoStore.exec(zip, result => {
      if (result) {
        if (result.lat && result.lng) {
          callback(null, result);
        } else {
          callback(null, null);
        }
      } else {
        callback(null, null);
      }
    });
  };

  //runs subsequently in a series
  let geoSvc = (result, callback) => {
    if (result) {
      callback(null, result);
    } else {
      zipToGeoSvc.exec(zip, (err, result) => {
        if (err) {
          callback(err, null);
        }
        if (result) {
          callback(null, result);
        }
      });
    }
  };

  async.waterfall([geoStore, geoSvc], (err, result) => {
    if (result) {
      let geo = {
        lat: result.lat,
        lng: result.lng
      };
      callback(null, geo);
    } else {
      callback(err, null);
    }
  });
};
