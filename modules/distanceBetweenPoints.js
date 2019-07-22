//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//name: distance between points
//purpose: calculates the distance between two geocodes
//credits: modified from GeoDataSource.com (C) All Rights Reserved 2018, see "3rd party Credits"
//@in: pair - geocode in JSON
//@out: sorted (asc) list of stores as array of objects
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const config = require("../config");
const async = require("async");

module.exports.exec = (pair, callback) => {
  let distances = [];

  for (let i = 0; i < global.storedata.length; i++) {
    let distance = {};
    let lat1 = pair.lat,
      lon1 = pair.lng,
      lat2 = global.storedata[i].Latitude,
      lon2 = global.storedata[i].Longitude;

    if (lat1 != lat2 || lon1 != lon2) {
      let radlat1 = (Math.PI * lat1) / 180,
        radlat2 = (Math.PI * lat2) / 180,
        theta = lon1 - lon2,
        radtheta = (Math.PI * theta) / 180,
        dist =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (config.optDistance == "K") {
        dist = dist * 1.609344;
      }
      if (config.optDistance == "N") {
        dist = dist * 0.8684;
      }

      let store = Object.assign(
        { Distance: dist.toFixed(config.distanceFixed) },
        { Unit: config.optDistanceName },
        global.storedata[i]
      );
      distances.push(store);
    } else {
      //pairs cannot be the same
      /*dont let this become a black hole*/
    }
  }

  //sort ascending by distance
  distances.sort((a, b) => parseFloat(a.Distance) - parseFloat(b.Distance));
  callback(null, distances);
};
