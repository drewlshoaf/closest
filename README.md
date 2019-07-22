# closest

http server which returns the closest location from a list of locations, given a zipcode or address

# install

clone repository, then run:

    npm install

# testing

run:

    npm test

# testing

run:

    npm start

# other

1. We are not entirely clear on the age calculation requirements. We could potententially calculate age in a compounding manner, ie: reduce the present value of the vehicle based on the prior months present value, or simply reduce the value based on a cumulative percentage. We're assuming and have chosen the latter.

2. We've made a number of assumptions on what the input values may constitute in terms of types, lengths, values, etc. These assumptions are represented in /validation/validateInputs.js

3. With respect to the "owners" input rules, we assume that the clause "If the car has had more than 2 previous owners" means that the "owners" input must be at least 4, in order to be invoked. In other words "If the car has had at least 4 owners including the present owner", then ... If this is not a correct interpretation, then we can easil change this value in /config.js

# credit

/validation/is-empty.js is a validation script which evaluates various types of "emptiness". It was developed by Brad Traversy https://www.traversymedia.com/.
