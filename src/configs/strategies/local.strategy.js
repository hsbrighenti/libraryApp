var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (nano) {
    var usersCollection = nano.use('users');

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function (username, password, done) {
        var user = {
            username: username,
            password: password
        };
        usersCollection.get(username, { include_docs: true }, function (err, body) {
            if (!err) {
                if (body.password === password) {
                    done(null, user);
                } else {
                    done(null, false, { message: 'Bad Password' });
                }
            } else if(err.statusCode === 404) {
                done('User Not Found', false);
            } else {
                done(err, false);
            }
        });
    }));
};