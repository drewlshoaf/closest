const config = require("./config"),
  async = require("async"),
  express = require("express"),
  closest = require("./routes/closest"),
  parseCSV = require("./modules/parseCSV");

app = express();
app.use("/closest/", closest);

/*
  startup routine
  //preload datasets before starting server
*/

async.series([
  callback => {
    async.parallel([zipData, storeData], function(err, result) {
      callback(null);
    });
  },
  httpserver
]);

function zipData(callback) {
  //loadZipData
  parseCSV.exec(config.zipdata, (err, result) => {
    if (err) {
      console.log(Date(), "error loading zipdata");
    }
    if (result) {
      global.zipdata = result;
      console.log(Date(), "zipdata loaded");
    }
    callback(null);
  });
}

function storeData(callback) {
  //loadStoreData
  parseCSV.exec(config.storedata, (err, result) => {
    if (err) {
      console.log(Date(), "error loading storedata");
    }
    if (result) {
      global.storedata = result;
      console.log(Date(), "storedata loaded");
    }
    callback(null);
  });
}

function httpserver(callback) {
  const port = process.env.PORT || config.port;
  app.listen(port, () =>
    console.log(Date(), `httpserver started on port ${port}`)
  );
  callback(null);
}
