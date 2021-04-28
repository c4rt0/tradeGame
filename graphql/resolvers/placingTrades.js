const Trade = require('../../models/trade');
const PlacedTrade = require('../../models/placedTrade');
const { transformPlacedTrade, transformTrade } = require('./combined');

module.exports = {
    
    placedTrades: async () => {
        try{
            const placedTrades = await PlacedTrade.find();
            return placedTrades.map(placedTrade => {
                return transformPlacedTrade(placedTrade);
            });
        } catch (err) {
            throw err;
        }
    },

    placeTrade: async args => {
        console.log("Trade ID: " + args.placeTrade._id);
        const fetchedTrade = await Trade.findOne({_id: args.placeTrade._id});
        console.log("And the Trade: "+ fetchedTrade.ticker);
        // const tickerCheck = fetchedTrade.ticker,
        const placedTrade = new PlacedTrade({
            user: '60456346b490ca5590f171bf',
            trade: fetchedTrade,
            price: 14.44,
            quantity: 12,
            ticker: fetchedTrade.ticker     // This causing me a headake !
        });
        // console.log(placedTrade)
        const result = await placedTrade.save();
        return transformPlacedTrade(result);
    },

    cancelTrade: async args => {
        try {
            const placedTrade = await PlacedTrade.findById(args.placedTradeId).populate('trade');
            const trade = transformTrade(placedTrade.trade);
            await PlacedTrade.deleteOne({_id: args.placedTradeId});
            return trade;
        } catch (error) {
            throw error;
        }
    }
};