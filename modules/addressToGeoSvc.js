//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//name: address to geo svc
//purpose: retrieves geocode from mapquest, given a valid address
//@in: address, string
//@out: geocode in JSON
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const config = require("../config");
const https = require("https");

module.exports.exec = (address, callback) => {
  let requrl =
    "https://www.mapquestapi.com/geocoding/v1/address?" +
    "key=" +
    config.mapquestkey +
    "&location=" +
    encodeURI(address);

  https
    .get(requrl, res => {
      let data = "";
      res.on("data", chunk => {
        data += chunk;
      });
      res.on("end", () => {
        let json = JSON.parse(data);
        if (json.error_code) {
          callback(404, null);
        } else {
          let result = {
            lat: json.results[0].locations[0].latLng.lat,
            lng: json.results[0].locations[0].latLng.lng
          };
          callback(null, result);
        }
      });
    })
    .on("error", err => {
      callback(500, null);
    });
};
