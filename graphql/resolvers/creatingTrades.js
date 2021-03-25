const Trade = require('../../models/trade');
const { dateToString } = require('../../helpers/date');
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
        price: +args.tradeInput.price,
        date: dateToString(args.tradeInput.date),
        trader: '60456346b490ca5590f171bf'
        });
        let createdTrade;
        try {
            const result = await trade.save();
            createdTrade = transformTrade(result);
            const trader = await User.findById('60456346b490ca5590f171bf');
        
            if (!trader) {
                throw new Error('User not found.');
            }
            trader.createdTrades.push(trade);
            await trader.save();
        
            return createdTrade;
        } catch (err) {
        // console.log(err);
        throw err;
        }
    }
};