var express = require('express');
var adminRouter = express.Router();

var books = [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich',
        read: false
    },
    {
        title: 'War and Peace2',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich',
        read: false
    },
    {
        title: 'War and Peace3',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich',
        read: false
    },
    {
        title: 'War and Peace4',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich',
        read: false
    },
    {
        title: 'War and Peace5',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich',
        read: false
    },
    {
        title: 'War and Peace6',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich',
        read: false
    },
    {
        title: 'War and Peace7',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich',
        read: false
    }
];

var router = function (nav, nano) {
    if (!nano.db) {
        console.error('No DB!');
        return false
    }

    adminRouter.route('/addBooks')
        .get(function (req, res) {
            nano.db.destroy('books', function () {
                // create a new database
                nano.db.create('books', function () {
                    // specify the database we are going to use
                    var collection = nano.use('books');
                    collection.bulk({ docs: books }, function (err, body, header) {
                        res.send(body);
                    })
                });
            });
        });

    return adminRouter;
};

module.exports = router;