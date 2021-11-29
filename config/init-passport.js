const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");

const UserLib = require("../lib/users/user.lib");

const { JWT_ISS, JWT_MAX_AGE, JWT_AUD, JWT_KEY } = process.env;

const opts = {
  algorithms: ["HS256"],
  audience: JWT_AUD,
  issuer: JWT_ISS,
  jsonWebTokenOptions: {
    maxAge: JWT_MAX_AGE.toString(),
  },
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_KEY,
};

const initPassport = (app) => {
  app.use(passport.initialize());

  passport.use(
    new Strategy(opts, async (jwtPayload, done) => {
      try {
        const { sub } = jwtPayload;

        // Make sure sub is available
        if (!sub) {
          return done(null, false);
        }

        const user = await UserLib.findOne({ _id: sub }, {}, { lean: true });

        return done(null, user);
      } catch (error) {
        done(error, false);
      }
    })
  );
};

module.exports.initPassport = initPassport;
