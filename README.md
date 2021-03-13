# tradegame.org

Ok, so... initially this supposed to be short and quick project. During development phase I decided to jump into GRAPHQL and resign of the good old REST API style just to learn and develop something new / fresh. Oh man... it's fun (&it takes time) ^_^

### 6 Mar 2021
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
  createTrade(tradeInput: {ticker:"AAPL", description:"Some other description", price:121.42, date:"2021-03-06T15:06:50.643Z"}){
    ticker
    price
  }
}
```

Sample GRAPHQL querry:

```
query {
  trades {
    ticker
    _id
  }
}
```

Now after running mutation under link above (./graphql) details of trade are being saved into mongo database cluster.

At this point, once creating user schema with username and password in GRAPHQL I also installed bcryptjs in order to hash those passwords and compare results to incoming passwords in the future.

============================================================================

Used findOne() to block double user creation based on email address. Mutation for creating user (typed in the GraphiQl - localhost:3000/graphql):

```
mutation {
  createUser(userInput:{email:"test@adamcoding.com", password:"tester"}) {
    email
    password
  }
}
```

Further mutation of placing a trade:

```
mutation {
  createTrade(tradeInput: {ticker: "GOOG", description: "One of most common stocks", price: 2108, date: "2021-03-06T17:53:18.661Z"}) {
    ticker
    price
    description
  }
}
```

and it's result:

![GraphQL trade created](https://github.com/c4rt0/tradeGame/blob/main/images/GraphQL_User_DB.PNG?raw=true)

=========================
CURRENT STATUS 

```
query{
  trades {
    ticker
    price
    creator {
      email
    }
  }
}
```

RETURNS :

```
{
  "data": {
    "trades": [
      {
        "ticker": "GOOG",
        "price": 2108,
        "creator": {
          "email": "test@adamcoding.com"
        }
      },
      {
        "ticker": "BTCUSD",
        "price": 48547.58,
        "creator": {
          "email": "test@adamcoding.com"
        }
      },
      {
        "ticker": "BTCUSD",
        "price": 48547.58,
        "creator": {
          "email": "test@adamcoding.com"
        }
      },
      {
        "ticker": "IOTAUSDT",
        "price": 1.3001,
        "creator": {
          "email": "test@adamcoding.com"
        }
      },
      {
        "ticker": "AAPL",
        "price": 22.22,
        "creator": {
          "email": "test2@adamcoding.com"
        }
      }
    ]
  }
}
```

Placing Trades:

```
mutation {
  placeTrade(tradeId: "604ce201df5fd815ace258f0") {
    _id
    createdAt
    
  }
}
```

RETURNS:

```
{
  "data": {
    "placeTrade": {
      "_id": "604d2a0bfa22eb0f3457e9ec",
      "createdAt": "2021-03-13T21:09:31.723Z"
    }
  }
}
```




/// DEPRACATED :




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