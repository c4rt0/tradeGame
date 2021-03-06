# tradegame.org

While running this app remember to install node and some sort of mysql server.
I simply installed Wampserver64 just because it's convinient, quick and easy to use. Once server is up and running, in terminal navigate to directory with server.js file and type in :

To test MySQL functionality, uncomment selected part of code and run:

```bash
node mysql_server.js
```

Run tradegame with :

```bash
npm run dev
```

In case you want to have a look at all available tickers under iexcloud.io, just replace token in the link below:

```
https://cloud.iexapis.com/beta/ref-data/symbols?token=YOUR_TOKEN_HERE
```

03/02/2021
Sample request for historical data:

```
https://cloud.iexapis.com/stable/stock/aapl/chart/1y?token=YOUR_TOKEN_HERE
```

Samples : sampleStockData/

Location of .env file same as app.js.
Example of the .env file :

```
IEX_API_KEY = YOUR_TOKEN_HERE
PORT = 3000
```

============================================================================
The graphQL (app.js) version uses nodemon.json as an env file, located in same directory.

nodemon.json template:

```
{
    "env": {
        "MONGO_USER": "username",
        "MONGO_PASSWORD": "yourmongouserpassword",
        "MONGO_DB": "your-db-name"
    }
}
```

http://localhost:3000/graphql

Date format obtained from Chrome developer console after using:
```
new Date().toISOString()
```

Sample mutation for GRAPHQL:

```
mutation {
  createEvent(eventInput: {ticker:"AAPL", description:"Some other description", price:121.42, date:"2021-03-06T15:06:50.643Z"}){
    ticker
    price
  }
}
```

Sample GRAPHQL querry:

```
query {
  events {
    ticker
    _id
  }
}
```

Now after running mutation under link above (./graphql) details of event are being saved into mongo database cluster.

At this point, once creating user schema with username and password in GRAPHQL I also installed bcryptjs in order to hash those passwords and compare results to incoming passwords in the future.

* 06 Mar 20221

Used findOne() to block double user creation based on email address. Mutation for creating user (typed in the GraphiQl - localhost:3000/graphql):

```
mutation {
  createUser(userInput:{email:"test@adamcoding.com", password:"tester"}) {
    email
    password
  }
}
```