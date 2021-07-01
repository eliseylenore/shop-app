// for more info about the validator package: https://www.npmjs.com/package/validator

const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateAddressInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.addressline1 = !isEmpty(data.addressline1) ? data.addressline1 : "";
  data.addressline2 = !isEmpty(data.addressline2) ? data.addressline2 : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : "";
  data.country = !isEmpty(data.country) ? data.country : "";

  // Address line1 checks
  if (Validator.isEmpty(data.addressline1)) {
    errors.addressline1 = "Address Line 1 field is required";
  }
  // City checks
  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required";
  }
  // State checks
  if (Validator.isEmpty(data.state)) {
    errors.state = "State field is required";
  }
  // State checks
  if (Validator.isEmpty(data.country)) {
    errors.country = "Country field is required";
  } else if (!Validator.equals("United States")) {
    errors.country = "Country must be United States";
  }
  // Zipcode checks
  if (Validator.isEmpty(data.zipcode)) {
    errors.zipcode = "Zipcode field is required";
  } else if (!Validator.isPostalCode(data.zipcode, "US")) {
    errors.zipcode = "Zipcode is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
