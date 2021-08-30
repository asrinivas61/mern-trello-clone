// /**
//  * Created by Srinivasa Rao A on 29/08/2021
// */
// const passport = require('passport');
// const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy

// const config = require('../config');
// const { logger } = require('../loggers');

// const passport_init = function() {
//     passport.use(new GoogleStrategy({
//         clientID:     config.GOOGLE.CLIENT_ID,
//         clientSecret: config.GOOGLE.CLIENT_SECRET,
//         callbackURL: "http://89.45.189.81:80/auth/google/callback",
//         passReqToCallback   : true
//     },
//     function(request, accessToken, refreshToken, profile, done) {
//         User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return done(err, user);
//         });
//     }
//     ));

//     passport.serializeUser(function (user, done) {
//         done(null, user);
//     });
// }

// module.exports = passport_init;
