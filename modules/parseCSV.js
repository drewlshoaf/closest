const csv = require("csv-parser");
const fs = require("fs");

module.exports.exec = (datafile, callback) => {
  let err = {},
    result = [];
  fs.createReadStream(datafile)
    .pipe(csv())
    .on("data", row => {
      result.push(row);
    })
    .on("error", () => {
      callback(error);
    })
    .on("end", () => {
      callback(null, result);
    });
};
