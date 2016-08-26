var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cfEnv = require('cfenv');
var appEnv = cfEnv.getAppEnv();

// Set up DB credentials to connect to Bluemix
var dbCreds;
if (appEnv.isLocal) {
    // A not so elegant but simple way to run and debug the application locally 
    dbCreds = require('./local_configs/bluemixServices.json').cloudantNoSQLDB[0].credentials;
} else {
    dbCreds = appEnv.getServiceCreds('libraryApp-hsbrighenti-cloudantNoSQLDB');
}

// Connect do the DB
var nano = require('nano')(dbCreds.url);

// Static nav bar links
var nav = [
    {
        link: '/books',
        text: 'Books'
    }, {
        link: '/authors',
        text: 'Authors'
    }];

// Set up routers and static directory
var bookRouter = require('./src/routes/bookRoutes')(nav, nano);
var adminRouter = require('./src/routes/adminRoutes')(nav, nano);
var authRouter = require('./src/routes/authRoutes')(nav, nano);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use(express.static('public'));

// Set up Views, renderer and main routes
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
        ],
    });
});

app.get('/authors', function (req, res) {
    res.send('Hello Authors');
});

// Start Server
app.listen(appEnv.port, function (err) {
    console.log('Running server at ' + appEnv.url);
});