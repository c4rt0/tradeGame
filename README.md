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

example of the .env file :

> IEX_API_KEY = pk_34ef482cf8ea4265aaf8994b06f6fc25
> PORT = 5000