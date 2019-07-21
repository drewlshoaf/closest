const Validator = require("validator");
const isEmpty = require("./emptiness");

module.exports.exec = function validateInputs(data, callback) {
  let err = {},
    result = {};

  /*
    higher level rules
  */

  /*
    lookup field is required
  */

  if (isEmpty(data.zip) && isEmpty(data.address)) {
    err.empty = "A lookup field is required";
  }

  /*
    ambiguous lookup field
  */
  if (!isEmpty(data.zip) && !isEmpty(data.address)) {
    err.ambiguous = "Only one lookup field is allowed";
  }

  /*
    type specific rules
  */

  if (isEmpty(err)) {
    if (!isEmpty(data.zip)) {
      (result.type = "zip"), (result.value = data.zip);

      /*
        zip code rules
      */

      if (!Validator.isLength(data.zip, { min: 10, max: 10 })) {
        err.value = "Zip value must be in 'xxxxx-xxxx' format";
      }
      if (
        !Validator.isNumeric(data.zip.substring(0, 5), { no_symbols: true })
      ) {
        err.value = "Zip value must be in 'xxxxx-xxxx' format";
      }
      if (
        !Validator.isNumeric(data.zip.substring(6, 10), { no_symbols: true })
      ) {
        err.value = "Zip value must be in 'xxxxx-xxxx' format";
      }
      if (data.zip.substring(5, 6) !== "-") {
        err.value = "Zip value must be in 'xxxxx-xxxx' format";
      }
    }

    if (!isEmpty(data.address)) {
      (result.type = "address"), (result.value = data.address);

      /*
        address rules
        //we should probably do some more sophisticated checking here itf
      */

      lookupType = "address";
      if (!Validator.isLength(data.address, { min: 10, max: 150 })) {
        err.value = "Address value contain between 10 and 150 characters";
      }
    }
  }

  callback(err, result);
};
