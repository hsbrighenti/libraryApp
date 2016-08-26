var express = require('express');
var authRouter = express.Router();

var router = function (nav, nano) {
    if (!nano.db) {
        console.error('No DB!');
        return false;
    }

    authRouter.route('/signup')
        .post(function (req, res) {
            res.send(req.body);
        });

    return authRouter;
};

module.exports = router;