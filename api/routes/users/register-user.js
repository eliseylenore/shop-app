const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../../validation/register");
const User = require("../../models/user");

module.exports = async function(req, res) {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    let { name, email, password } = req.body;
    // Hash password before saving in database
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) reject(err);
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
    });
    await User.create({
      name,
      email,
      password: hashedPassword
    });
  } catch (e) {
    if (String(e).startsWith("MongoError: E11000 duplicate key error")) {
      return res.status(400).json({ email: "Email already exists" });
    }
    console.error(`Error occurred while adding new user, ${e}.`);
  }
};
