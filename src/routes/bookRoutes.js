var express = require('express');
var bookRouter = express.Router();

var router = function (nav) {
    bookRouter.route('/')
        .get(function (req, res) {
            res.render('books', {
                title: 'Books',
                nav: nav
            });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            res.send('Hello single Book with Id ' + id);
        });

    return bookRouter;
};

module.exports = router;