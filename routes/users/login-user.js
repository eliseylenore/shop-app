const bcrypt = require("bcryptjs");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/user");

const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Create JWT Payload
      const payload = {
        id: user.id,
        name: user.name
      };
      // Sign token
      jwt.sign(
        payload,
        process.env.DB_SECRETORKEY,
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
            email,
            user
          });
        }
      );
    } else {
      return res.status(400).json({ passwordincorrect: "Password incorrect" });
    }
  } catch (e) {
    console.log(e);
  }
};
