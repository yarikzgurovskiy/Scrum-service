const passport = require('passport');
const User = require('../models/user').User;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

let hash = require('../modules/hash');

require('dotenv').config({ path: '../.env' });


const localLogin = new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username, password: hash.passwordHash(password) }, function (err, user) {
        if (err) { return done(null, false, { message: 'Failure auth' }); }
        else return done(null, user);
    });
});

// Create JWT Strategy

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // See if the user ID in the payload exists in our database
    // If it does, call 'done' with that other
    // otherwise, call done without a user object
    User.findById(payload.id, function (err, user) {
        if (err) { return done(err, false); }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});

// Tell passport to use these strategies
passport.use(jwtLogin);
passport.use(localLogin);