const authResolver = require('./auth');
const tradeResolver = require('./creatingTrades');
const placingTradeResolver = require('./placingTrades');

const rootResolver = {
    ...authResolver,
    ...placingTradeResolver,
    ...tradeResolver
};

module.exports = rootResolver;