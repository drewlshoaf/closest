module.exports = {
  //http port
  port: 3001,

  //storedata source
  storedata: "data/store-locations.csv",

  //zipdata source
  zipdata: "data/zip.csv",

  //zipcodeapikey - zipcodeapi.com, service for zip => geo
  zipcodeapikey:
    "YTH2SfDYAJUlp8boFtCdka9FK21CHWxuxhpe810zd53mUJ1kUffvySS53l077qkA",

  //mapquestkey - developer.mapquest.com, service for address => geo
  mapquestkey: "kUS0aqbhuU3gXjJjNQVESylYG0QqUHQq",

  //oDist N==nautical miles, K==kilometres
  optDistance: "N",

  //oDistName long name
  optDistanceName: "Nautical Miles",

  //distanceFixed //# decimal places for nautical miles and kilometres
  distanceFixed: 2
};
