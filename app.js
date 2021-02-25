const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');

// for the use with API
const request = require('request');

const PORT = process.env.PORT || 5000; 	// The double pipe here allows to use the OR function, where once we deploy it
										// locally we use port 5000, when released it uses server specific PORT... 
const someOtherStuff = "This is some other testing stuff..."

request('https://cloud.iexapis.com/stable/stock/fb/quote?token=##################_YOUR_IEX_CLOUD_TOKEN_##############', { json: true }, (err, res, body) => {
    if (err) {return console.log(err);}
    console.log("No error");
    if (res.statusCode === 200) {
        console.log(body);
    };
});

// Ser Handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set Handlebar route
app.get('/', function (req, res) {
    res.render('home', {
        stuff: someOtherStuff
    });
});

//create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port: ' + PORT));