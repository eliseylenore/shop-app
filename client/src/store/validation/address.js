// for more info about the validator package: https://www.npmjs.com/package/validator

import { isEmpty, isEmail, isPostalCode, equals} from "validator";

// const isEmpty = require("is-empty");
export default  {
  validateAddressInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.addressline1 = !isEmpty(data.addressline1) ? data.addressline1 : "";
    data.addressline2 = !isEmpty(data.addressline2) ? data.addressline2 : "";
    data.city = !isEmpty(data.city) ? data.city : "";
    data.state = !isEmpty(data.state) ? data.state : "";
    data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : "";
    data.country = !isEmpty(data.country) ? data.country : "";
  
    if (!isEmpty(data.email) && !isEmail(data.email)) {
      console.log("Email invalid", data.email);
      errors.email = "Email is invalid";
    }
  
    // Address line1 checks
    if (isEmpty(data.addressline1)) {
      errors.addressline1 = "Address Line 1 field is required";
    }
    // City checks
    if (isEmpty(data.city)) {
      errors.city = "City field is required";
    }
    // State checks
    if (isEmpty(data.state)) {
      errors.state = "State field is required";
    }
    // State checks
    if (isEmpty(data.country)) {
      errors.country = "Country field is required";
    } else if (!equals(data.country, "United States")) {
      errors.country = "Country must be United States";
    }
    // Zipcode checks
    if (isEmpty(data.zipcode)) {
      errors.zipcode = "Zipcode field is required";
    } else if (!isPostalCode(data.zipcode, "US")) {
      errors.zipcode = "Zipcode is invalid";
    }
  
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
};
