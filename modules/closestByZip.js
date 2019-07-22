//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//name: closest by zip
//purpose: marshalls zip to geo - this is designed to allow for searching of multiple data sources, starting locally (geoStore), then via cloud (geoSvc)
//note: the geoStore and geoSvc functions are designed to run sequentially in this case and must be modified if the order changes
//@in: zip, string
//@out: store data in JSON
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

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
