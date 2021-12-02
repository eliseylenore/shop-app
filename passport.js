// call the packages we need
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./models/user");

// More info on JWT strategy: http://www.passportjs.org/packages/passport-jwt/
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.DB_SECRETORKEY;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          // returns 401 http status?
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
