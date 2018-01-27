const passport = require('passport');

const requireSignIn = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = {
    requireAuth,
    requireSignIn
}

