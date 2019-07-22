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

# usage

## **zip**

zip returns the closest store, given a zip code

- **params**

  @zip: 10-digit zip code in format xxxxx-xxxx

* **output:**

  <_The request type_>

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
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

* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  - **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format (\$.ajax call or a curl request) - this makes life easier and more predictable._>

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._>

  npm start
