const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const PORT = process.env.PORT || 5000; 	// The double pipe here allows to use the OR function, where once we deploy it
										// locally we use port 5000, when released it uses server specific PORT... 
const someOtherStuff = "This is some other testing stuff..."

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