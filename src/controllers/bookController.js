

var bookController = function (bookService, nav, nano) {
    var collection = nano.use('books');

    var middleware = function (req, res, next) {
        // if (!req.user) {
        //     res.redirect('/');
        // }
        next();
    };

    var getIndex = function (req, res) {
        collection.list({ include_docs: true }, function (err, body) {
            var bookList = body.rows || [];
            res.render('bookList', {
                title: 'Books',
                nav: nav,
                books: bookList
            });
        });
    };

    var getById = function (req, res) {
        var id = req.params.id;
        collection.get(id, function (err, body, headers) {
            bookService.getBookById(body.bookId, function (err, result) {
                res.render('bookView', {
                    title: 'Books',
                    nav: nav,
                    book: result
                });
            });
        });
    };

    return {
        middleware: middleware,
        getIndex: getIndex,
        getById: getById
    };
};

module.exports = bookController;