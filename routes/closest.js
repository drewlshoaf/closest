const express = require("express");
const router = express.Router();
const async = require("async");

//validation
const isEmpty = require("../validation/emptiness");
const validateInputs = require("../validation/validateInputs");

//modules
const lookupByZip = require("../modules/closestByZip");
const lookupByAddress = require("../modules/closestByAddress");
const distanceBetweenPoints = require("../modules/distanceBetweenPoints");

// @route GET /
// @desc
// @access Public
router.get("/", (req, res) => {
  async.waterfall([validate, getGeo, getClosest], (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(result);
    }
  });

  function validate(callback) {
    validateInputs.exec(req.query, (err, result) => {
      handleCallback(err, result, callback);
    });
  }

  function getGeo(data, callback) {
    if (data.type === "zip") {
      lookupByZip.exec(data.value.substring(0, 5), (err, result) => {
        handleCallback(err, result, callback);
      });
    }
    if (data.type === "address") {
      lookupByAddress.exec(data.value, (err, result) => {
        handleCallback(err, result, callback);
      });
    }
  }

  function getClosest(data, callback) {
    distanceBetweenPoints.exec(data, (err, result) => {
      handleCallback(err, result, callback);
    });
  }

  function handleCallback(err, result, callback) {
    if (!isEmpty(err)) {
      callback(err);
    } else {
      callback(null, result);
    }
  }
});

module.exports = router;
