# closest

http server which returns the closest location from a list of locations, given a zipcode or address

# configuration

configuration options in /config.js:

//http port
port: 3001

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

# dependencies

We use the following dependent packages:

    "async": "^2.6.2" - async.series is helping us control flow and manage sequenced tasks
    "express": "^4.16.4", - http routing, logging
    "mocha": "^6.0.2", - for unit testing, see testing
    "nodemon": "^1.18.10", - for development
    "request": "^2.88.0", - used to request remote resources
    "validator": "^10.11.0" - used for validation (rudimentary for this project) of user inputs

# testing

All unit tests can be invoked by running:

     npm test

We include the following unit tests:

    /test/1 - age.js
    /test/2 - mileage.js
    /test/3 - collisions.js
    /test/4 - owners.js
    /test/5 - final.js

Each test represents a module in /modules/.

Tests 1-3 (age, mileage, collisions) take 1 object and 1 integer as inputs. As example, the "1 - age.js" test takes {tmpvalue : 10000, age : 1 } and -50 as inputs, where tmpvalue is the present value of the vehicle, age is the age of the vehicle in months, and -50 is the expected outcome of the test (-50 is the affect of the inputs on the final vehicle value). NoteL: the 2nd attribute name in the input object differs depending on test, ie: age, mileage, collisions, etc.

Test 4 (owners) also takes an object and integer as inputs, however, the integer represents the altered present value of the vehicle, instead of the alteration itself.

Test 5 (final) is used to test all of the modules in conjunction and returns the final value of the vehicle. The outcome integer is stored within the input object. As example below, given the inputs for value, age, collisions, mileage, and owners, the expected outcome is 10670.

    {
      value : 10000,
      age : 1,
      collisions : 1,
      mileage : 1000,
      owners : 1,
      expected : 10670
    }

Test data for test 5 is stored in /test/test.data. Simply add additional tests as JSON objects in a comma-delimited array and they will automatically get added to the test sequence.

# install and run locally

Install:

1. Clone the repo
2. Install all dependencies (express, async, request, validator) and optional dependencies, mocha for testing, and nodemon for development.

Run the service:

      (prod) node index.js

      or

      (dev) nodemon index.js

Access:
Since this is a back-end service and does not contain a user interface, I recommend using an http client such as Postman for testing, but a browser will work also. After starting the service on a local interface, ie: localhost / 127.0.0.1.

A sample request is as follows: http://localhost:3001/value/10000/make/subaru/model/Outback/age/1/mileage/1000/owners/2/collisions/1

# other

1. We are not entirely clear on the age calculation requirements. We could potententially calculate age in a compounding manner, ie: reduce the present value of the vehicle based on the prior months present value, or simply reduce the value based on a cumulative percentage. We're assuming and have chosen the latter.

2. We've made a number of assumptions on what the input values may constitute in terms of types, lengths, values, etc. These assumptions are represented in /validation/validateInputs.js

3. With respect to the "owners" input rules, we assume that the clause "If the car has had more than 2 previous owners" means that the "owners" input must be at least 4, in order to be invoked. In other words "If the car has had at least 4 owners including the present owner", then ... If this is not a correct interpretation, then we can easil change this value in /config.js

# credit

/validation/is-empty.js is a validation script which evaluates various types of "emptiness". It was developed by Brad Traversy https://www.traversymedia.com/.
