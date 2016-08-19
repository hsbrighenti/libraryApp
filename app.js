var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

var nav = [
    {
        link: '/books',
        text: 'Books'
    }, {
        link: '/authors',
        text: 'Authors'
    }];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

app.use(express.static('public'));
app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from the renderer',
        nav: [
            {
                link: '/books',
                text: 'Books'
            },
            {
                link: '/authors',
                text: 'Authors'
            }
        ]
    }
    );
});

app.get('/authors', function (req, res) {
    res.send('Hello Authors');
});

app.listen(port, function (err) {
    console.log('Running server on port ' + port);
});