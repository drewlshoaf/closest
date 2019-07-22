//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//name: closest by address
//purpose: marshalls address to geo svc - this is loosely coupled so that we may add additional sources/services in the future (like we did with zip)
//@in: address, string
//@out: store data in JSON
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

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
