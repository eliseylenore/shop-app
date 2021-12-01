const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateEditProfileInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.useremail = !isEmpty(data.useremail) ? data.useremail : "";
  data.reviewText = !isEmpty(data.reviewText) ? data.reviewText : "";
  // Email check
  if (
    !Validator.isEmpty(data.useremail) &&
    !Validator.isEmail(data.useremail)
  ) {
    errors.useremail = "Email is invalid";
  }

  if (data.reviewText !== "") {
    // reviewText checks
    if (!Validator.isLength(data.reviewText, { max: 300 })) {
      errors.reviewText =
        "Maximum 300 characters (" +
        data.reviewText.length -
        300 +
        " too many)";
    }
  }

  if (data.rating === null) {
    errors.rating = "Rating is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
