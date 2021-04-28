const Trade = require('../../models/trade');
const User = require('../../models/user')

const { transformTrade } = require('./combined');

module.exports = {
    trades: async () => {
        try {
        const trades = await Trade.find();
        return trades.map(trade => {
            return transformTrade(trade);
        });
        } catch (err) {
            throw err;
        }
    },
    createTrade: async args => {
        const trade = new Trade({
        ticker: args.createTradeInput.ticker,
        user: '608858614259020460b80e2c',
        description: args.createTradeInput.description
        });
        const inputTicker = args.createTradeInput.ticker;
        if (inputTicker.length < 2 ){                       // Checking length of ticker
            console.log("Dude... size matters :D");
        } else {
            let createdTrade;

            // try {
            //     const fetchTicker = await Trade.findOne({ticker: args.createTradeInput.ticker});
            //     // const fetchedTicker = fetchTicker.ticker;
            //     console.log("Fetched ticker: " + fetchTicker.ticker);
            //     console.log("Input ticker: " + inputTicker);
            //     if (fetchTicker != null) {
            //         console.log("Fetched ticker: " + fetchTicker.ticker);
            //         console.log("Input ticker: " + inputTicker);
            //         console.log("Not so fast Cowboy - your ticker already exists! " );
            //         return;
            //     }
            // } catch (err) {
            //     throw err;
            //     }

            try {
                // } else {
                const result = await trade.save();
                createdTrade = transformTrade(result);
                const user = await User.findById('608858614259020460b80e2c');
                if (!user) {
                    throw new Error('User not found.');
                }
                const tickerCheck = await Trade.findOne(trade);
                console.log("Created trade with ticker: " + tickerCheck.ticker);
                user.createdTrades.push(trade);
                await user.save();
                return createdTrade;
                // }
            } catch (err) {
            throw err;
            }
        }
    }
};