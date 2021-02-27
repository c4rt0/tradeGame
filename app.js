require('dotenv').config();
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000; 	// The double pipe here allows to use the OR function, where once we deploy it
										// locally we use port 5000, when released it uses server specific PORT... 

// use bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));

// Create CALL API function
function callInitialApi(finishedApiCall, ticker) {
    var ticker = "TSLA"
    request('https://cloud.iexapis.com/stable/stock/'+ ticker +'/quote?token=TOKEN', { json: true }, (err, res, body) => {
        if (err) {return console.log(err);}
        console.log("<<< No error detected, while connecting to IEX Cloud API >>> " + body);
        if (res.statusCode === 200) {
            finishedApiCall(body);
        };
    });
};

// Create CALL API function
function callApi(finishedApiCall, ticker) {
    request('https://cloud.iexapis.com/stable/stock/'+ ticker + '/quote?token=TOKEN', { json: true }, (err, res, body) => {
        if (err) {return console.log(err);}
        console.log("<<< No error detected, while connecting to IEX Cloud API >>> " + body);
        if (res.statusCode === 200) {
            finishedApiCall(body);
        };
    });
};


// Ser Handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set Handlebar GET route
app.get('/', function (req, res) {
    callInitialApi(function(whileApiCallIsComplete) {
        res.render('home', {
            stock: whileApiCallIsComplete,
        });
    });
});

// Set Handlebar POST TICKER route
app.post('/ticker', function (req, res) {
    callApi(function(whileApiCallIsComplete) {
        res.render('ticker', {
            stock: whileApiCallIsComplete,
        });
    }, req.body.stockTicker);
});

//create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set Handlebar GET TICKER route
app.get('/ticker', function (req, res) {
    callApi(function(whileApiCallIsComplete) {
        res.render('ticker', {
            stock: whileApiCallIsComplete,
        });
    });
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port: ' + PORT));