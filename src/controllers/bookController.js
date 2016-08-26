

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
            res.render('books', {
                title: 'Books',
                nav: nav,
                books: bookList
            });
        });
    };

    var getById = function (req, res) {
        var id = req.params.id;
        collection.get(id, function (err, body, headers) {
            var bookList = [body] || [];
            bookList[0].doc = body;
            res.render('books', {
                title: 'Books',
                nav: nav,
                books: bookList
            });
        });
    };

    return {
        middleware: middleware,
        getIndex: getIndex,
        getById: getById
    }
}

module.exports = bookController;