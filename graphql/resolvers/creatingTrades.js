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
        let inputTicker = args.createTradeInput.ticker;
        if (inputTicker.length < 2 ){                       // Checking length of input ticker
            console.log("You're ticker is too short dude!");
        }
        else{
            let createdTrade;
            try {
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
            } catch (err) {
            throw err;
            }
        }
    }
};