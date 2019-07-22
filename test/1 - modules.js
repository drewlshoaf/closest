const assert = require("assert");
const config = require("../config");

//modules
const addressToGeoSvc = require("../modules/addressToGeoSvc");
const closestByAddress = require("../modules/closestByAddress");
const closestByZip = require("../modules/closestByZip");
const distanceBetweenPoints = require("../modules/distanceBetweenPoints");
const parseCSV = require("../modules/parseCSV");
const zipToGeoSvc = require("../modules/zipToGeoSvc");

describe("1 - modules", function() {
  describe("module: address to geocode", function() {
    it("1413 Berkeley Street, Durham, NC 27705", function(done) {
      let address = "1413 Berkeley Street, Durham, NC 27705";
      addressToGeoSvc.exec(address, function(err, result) {
        if (err) done(err);
        if (result.lat && result.lng) {
          done();
        } else done(err);
      });
    });
  });
  describe("module: closest store by address", function() {
    it("1413 Berkeley Street, Durham, NC 27705", function(done) {
      let address = "1413 Berkeley Street, Durham, NC 27705";
      closestByAddress.exec(address, function(err, result) {
        if (err) done(err);
        if (result.lat && result.lng) {
          done();
        } else done(err);
      });
    });
  });
  describe("module: closest store by zip", function() {
    it("27705", function(done) {
      let address = "27705";
      closestByZip.exec(address, function(err, result) {
        if (err) done(err);
        if (result.lat && result.lng) {
          done();
        } else done(err);
      });
    });
  });

  //future improvement: dev test w/ local data
  /*
  describe("module: distance between points", function() {
    it("36.0212314,-78.9143841", function(done) {
      let pair = { lat: "36.0212314", lng: "-78.9143841" };
      distanceBetweenPoints.exec(pair, function(err, result) {
        if (err) done(err);
        if (result) {
          done();
        } else done(err);
      });
    });
  });
  */
  describe("module: parse CSV", function() {
    it("store-locations.csv", function(done) {
      parseCSV.exec(config.storedata, function(err, result) {
        if (err) done(err);
        if (result) {
          done();
        } else done(err);
      });
    });
  });
  //future improvement: dev test w/ local data
  /*
  describe("module: zip to geo from storage", function() {
    it("36.0212314,-78.9143841", function(done) {
      let pair = { lat: "36.0212314", lng: "-78.9143841" };
      distanceBetweenPoints.exec(pair, function(err, result) {
        if (err) done(err);
        if (result) {
          done();
        } else done(err);
      });
    });
  });
  */
  describe("module: zip to geo from service", function() {
    it("27705", function(done) {
      let zip = 27705;
      zipToGeoSvc.exec(zip, function(err, result) {
        //console.log(result);
        let expected = {
          lat: 36.022144,
          lng: -78.975927,
          zip: "27705"
        };
        assert.equal(result.lat, expected.lat);
        assert.equal(result.lng, expected.lng);
        if (err) done(err);
        if (result) {
          done();
        } else done(err);
      });
    });
  });
});
