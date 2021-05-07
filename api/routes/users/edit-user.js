const bcrypt = require("bcryptjs");
const User = require("../../models/user");

const validateEditProfileInput = require("../../validation/editProfile");

module.exports = (req, res) => {
  // Form validation
  const { errors, isValid } = validateEditProfileInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, name, password } = req.body;
  User.findOne({ email: req.params.email }, function(err, user) {
    if (!user) {
      return res.status(400).json({ email: "No email found" });
    }
    if (err) res.status(400).json(err);
    // if email is different
    user.name = name;
    if (email !== req.params.email) {
      // check to see if new email is taken
      const findUser = async function(email) {
        try {
          User.findOne({ email });
        } catch (err) {
          console.log(err);
        }
      };
      const foundEmailUser = findUser(req.params.email);
      if (foundEmailUser) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        user.email = email;
      }
    }
    // Check password
    if (password) {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          return res
            .status(400)
            .json({ password: "You entered the same password!" });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;

              user.password = hash;
              user
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
          // to-do: record date so user knows when pw was last updated
        }
      });
    } else {
      user
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
};
