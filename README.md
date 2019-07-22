# closest

Closest is an http server which finds the closest "store" from a list of stores, given a zip code, or address.

# dev notes

- The solution has been developed in node.js and tested on the node 11.2 version with a mix of ECMA versions depending on purpose.
- The startup sequence in index.js loads multiple data sources (zip code data, store data) before starting the http server.
- For zip code searches, a local zip code file with goecodes has been provided. The solution attempts to obtain geocodes from storage prior to using an external service. The solution could be easily improved to continuously append new zip code data to the local storage file.
- The solution uses thge Express framework, with a single route: GET /closest
- The solution uses the npm validator validation framework for input validation. Some basic validation has been provided.
- config.js contains a number of configurable app-level options which can be easily adjusted
- distanceBetweenPoints.js is a modification of GeoDataSource.com's distance function. See 3rd party Credits for copyright and original code
- The solution uses 3rd party api data from zipcodeapi.com and developer.mapquest.com. Both services have provided free development licenses with quotas. Please note that if hourly quotas are exceeded, errors may occur when using this service.

# improvements

- The testing suite needs additional tests developed including tests which use local data.
- We should be storing new zip code -> geocode records after initial retrieval for faster future searches.
- The express route currently allows any type of GET request and does not attempt to validate parameters, rather, all validation is being done by validator. We should add express-level parameter validation for additional security.
- Add additional input validation to cleanse or reject malicious strings.
- Add additional input validation for address string validity
- Extensive use of callback patterns started to make debugging a little tricky. Consider promise-based patterns or use of debugging options.
- We are currently only returning a single record (closest store) per the requirement, however, the solution can very easily return an entire set of records with a very simple modification.

# install

clone repo, then run:

    npm install

# test

run:

    npm test

# run

run:

    npm start

# usage

- **zip**

find the closest store to a given zip code

    sample GET request: https://localhost/closest/?zip=27705-0000

- **address**

find the closest store to a given address

    sample GET request: https://localhost/closest/?address=777 Brockton Avenue, Abington MA

- **success response:**

  - **code:** 200 SUCCESS
    <br />
    returns an array of objects, example object:
    <br />

{
"Distance": "3.47",
"Unit": "Nautical Miles",
"Store Name": "Durham",
"Store Location": "SWC Shannon Rd & US Hwy 15-501",
"Address": "4037 Durham Chapel Hill Blvd",
"City": "Durham",
"State": "NC",
"Zip Code": "27707-2516",
"Latitude": "35.966045",
"Longitude": "-78.9587215",
"County": "Durham County"
}

- **code:** 400 BAD REQUEST<br />
  result was not found or invalid parameters
