//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//name: closest route
//purpose: serves requests for GET /closest
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const express = require("express"),
  router = express.Router(),
  async = require("async");

//validation
const isEmpty = require("../validation/emptiness"),
  validateInputs = require("../validation/validateInputs");

//modules
const closestByZip = require("../modules/closestByZip"),
  closestByAddress = require("../modules/closestByAddress"),
  distanceBetweenPoints = require("../modules/distanceBetweenPoints");

// @route GET /
// @desc returns the closest store, given a valid zip code or address
// @access Public (for now)
// @in [zip=<zip code> | address=<address>]
// @out [{store data}, ...]
router.get("/", (req, res) => {
  async.waterfall([validate, getGeo, getClosest], (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(result[0]);
    }
  });

  //validate inputs
  function validate(callback) {
    validateInputs.exec(req.query, (err, result) => {
      handleCallback(err, result, callback);
    });
  }

  //get geocode
  function getGeo(data, callback) {
    if (data.type === "zip") {
      closestByZip.exec(data.value.substring(0, 5), (err, result) => {
        handleCallback(err, result, callback);
      });
    }
    if (data.type === "address") {
      closestByAddress.exec(data.value, (err, result) => {
        handleCallback(err, result, callback);
      });
    }
  }

  //get the closest store
  function getClosest(data, callback) {
    distanceBetweenPoints.exec(data, (err, result) => {
      handleCallback(err, result, callback);
    });
  }

  //callback handler
  function handleCallback(err, result, callback) {
    if (!isEmpty(err)) {
      callback(err);
    } else {
      callback(null, result);
    }
  }
});

module.exports = router;
