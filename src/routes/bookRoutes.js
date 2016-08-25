var express = require('express');
var bookRouter = express.Router();

var router = function (nav, nano) {
    var collection = nano.use('books');

    bookRouter.route('/')
        .get(function (req, res) {
            collection.list({ include_docs: true }, function (err, body) {
                var bookList = body.rows || [];
                res.render('books', {
                    title: 'Books',
                    nav: nav,
                    books: bookList
                });
            });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            collection.get(id, function(err, body, headers){
                var bookList = [body] || [];
                bookList[0].doc = body;
                res.render('books', {
                    title: 'Books',
                    nav: nav,
                    books: bookList
                });
            });
        });

    return bookRouter;
};

module.exports = router;