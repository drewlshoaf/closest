# closest

http server which returns the closest location from a list of locations, given a zipcode or address

# install

clone repository, then run:

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

    sample GET request by zip: https://localhost/closest/?zip=27705-0000

- **address**

find the closest store to a given address

    sample GET request by zip: https://localhost/closest/?address=777 Brockton Avenue, Abington MA 2351

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    <br />
    returns an array of objects, as follows:
    [
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
    ]

  - **Code:** 400 NOT FOUND<br />
    **Content:**
    <br />
    result was not found

  - **Code:** 422 INVALID ENTRY <br />
    **Content:**
    <br />
    invalid request params

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._>
