// This is the original app.js which runs after refactoring the name back to app.js

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');

app.listen(3000);
app.use(bodyParser.json());
const token = process.env.IEX_API_KEY
const PORT = process.env.PORT || 5000; 	// The double pipe here allows to use the OR function, where once we deploy it
										// locally we use port 5000, when released it uses server specific PORT... 

// use bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));

// CALL API function
function callApi(finishedApiCall, ticker) {
    function iexApiRequest() {
        request('https://cloud.iexapis.com/stable/stock/'+ ticker +'/quote?token=' + token, { json: true }, (err, res, body) => {
            if (err) {return console.log(err);}
            console.log(" ");
            if (res.statusCode === 200) {
                finishedApiCall(body);
            };
        });
    };
    if (ticker != null) {
        iexApiRequest();
    } else {
        let randomTicker = ["TSLA", "AAPL", "GOOG", "SPX", "GM", "FB"];
        ticker = randomTicker[Math.floor(Math.random() * randomTicker.length)];
        console.log("Random ticker selected: " + ticker);
        iexApiRequest();
    };
}

// Ser Handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set Handlebar GET route
app.get('/', function (req, res) {
    callApi(function(whileApiCallIsComplete) {
        res.render('home', {
            stock: whileApiCallIsComplete,
        });
    });
});

// Set Handlebar POST TICKER route
app.post('/', function (req, res) {
    callApi(function(whileApiCallIsComplete) {
        res.render('home', {
            stock: whileApiCallIsComplete,
        });
    }, req.body.stockTicker);
});

//create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server listening on port: ' + PORT));