var express = require('express');
var authRouter = express.Router();
var passport = require('passport');

var router = function (nav, nano) {
    if (!nano.db) {
        console.error('No DB!');
        return false;
    }
    var usersCollection = nano.use('users');

    authRouter.route('/signup')
        .post(function (req, res) {
            usersCollection.insert({ password: req.body.password }, req.body.username, function (err, body) {
                if (!err) {
                    usersCollection.get(body.id, { include_docs: true }, function (err, body) {
                        if (!err) {
                            req.login(body, function () {
                                res.redirect('/auth/profile');
                            });
                        }
                    });
                }
            });
        });
    
    authRouter.route('/signin')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, res) {
            res.redirect('/auth/profile');
        });

    authRouter.route('/profile')
        .all(function(req, res, next){
            if(!req.user){
                res.redirect('/');
            }
            next();
        })
        .get(function (req, res) {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;