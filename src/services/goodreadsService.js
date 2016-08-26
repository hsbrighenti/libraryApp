var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});


var goodreadsService = function () {
    var getBookById = function (id, cb) {
        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/'+ id + '?format=xml&key=IoXbwd6A6EkDg4DyChwA2A'
        };

        var callback = function (response) {
            var str = '';
            
            response.on('data', function (chunk){
                str += chunk;
            });

            response.on('end', function() {
                parser.parseString(str, function (err, result) {
                    cb(null, result.GoodreadsResponse.book);
                });
            });
        };

        http.request(options, callback).end();
    };

    return {
        getBookById: getBookById
    }
};

module.exports = goodreadsService;