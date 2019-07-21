const async = require("async");
const addressToGeoSvc = require("./addressToGeoSvc");

module.exports.exec = (address, callback) => {
  addressToGeoSvc.exec(address, (err, result) => {
    if (err) {
      callback(err);
    }
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
