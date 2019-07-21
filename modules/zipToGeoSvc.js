const config = require("../config");
const https = require("https");

module.exports.exec = (zip, callback) => {
  let requrl =
    "https://www.zipcodeapi.com/rest/" +
    config.zipcodeapikey +
    "/info.json/" +
    zip +
    "/degrees";

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
            zip: json.zip_code,
            lat: json.lat,
            lng: json.lng
          };
          callback(null, result);
        }
      });
    })
    .on("error", err => {
      callback(500, null);
    });
};
