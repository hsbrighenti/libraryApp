var cfEnv = require('cfenv');
var appEnv = cfEnv.getAppEnv();
var dbCreds = appEnv.getServiceCreds('libraryApp-hsbrighenti-cloudantNoSQLDB');

var nano;
if (dbCreds) {
    nano = require('nano')(dbCreds.url);
} else {
    console.log('NO DB!');
}

var express = require('express');
var app = express();

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

app.listen(appEnv.port, function (err) {
    console.log('Running server at ' + appEnv.url);
});