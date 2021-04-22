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
        ticker: args.tradeInput.ticker,
        description: args.tradeInput.description,
        user: '60456346b490ca5590f171bf'
        });
        let createdTrade;
        try {
            const result = await trade.save();
            createdTrade = transformTrade(result);
            const user = await User.findById('60456346b490ca5590f171bf');
            if (!user) {
                throw new Error('User not found.');
            }
            //
            const tickerCheck = await Trade.findOne(trade);
            console.log("Current ticker: " + tickerCheck.description);
            user.createdTrades.push(trade);
            await user.save();
            return createdTrade;
        } catch (err) {
        throw err;
        }
    }
};