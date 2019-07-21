const config = require("./config"),
  async = require("async"),
  express = require("express"),
  closest = require("./routes/closest"),
  parseCSV = require("./modules/parseCSV");

app = express();
app.use("/closest/", closest);

/*
  startup
*/

const loadZipData = callback => {
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
};

const loadStoreData = callback => {
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
};

const httpserver = callback => {
  const port = process.env.PORT || config.port;
  app.listen(port, () =>
    console.log(Date(), `httpserver started on port ${port}`)
  );
  callback(null);
};

async.series([
  callback => {
    async.parallel([loadZipData, loadStoreData], function(err, result) {
      callback(null);
    });
  },
  httpserver
]);
