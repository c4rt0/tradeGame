const Trade = require('../../models/trade');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date')

const trades = async tradeIds => {
    try {
        const trades = await Trade.find({ _id: { $in: tradeIds } });
        return trades.map(trade => {
            return transformTrade(trade);
            });
    } catch (err) {
        throw err;
    }
};

const singleTrade = async tradeId => {
    try {
        const trade = await Trade.findById(tradeId);
        return transformTrade(trade);
    } catch (err) {
        throw err;
    }
};

const transformTrade = trade => {
    return {
        ...trade._doc,
        _id: trade.id,
        //date: dateToString(trade._doc.date),
        user: user.bind(this, trade.user)
    };
};

const transformPlacedTrade = placedTrade => { 
    console.log(placedTrade._doc);
    return {
    ...placedTrade._doc, 
    _id: placedTrade.id,
    user: user.bind(this, placedTrade._doc.user),
    trade: singleTrade.bind(this, placedTrade._doc),
    price: placedTrade._doc.price,
    quantity: placedTrade._doc.quantity,
    createdAt: dateToString(placedTrade._doc.createdAt),
    updatedAt: dateToString(placedTrade._doc.updatedAt)
    }
};

const user = async userId => {
    try {
        const user = await User.findById(userId);
        return {
        ...user._doc,
        _id: user.id,
        admin: user.admin,
        createdTrades: trades.bind(this, user._doc.createdTrades)
        };
    } catch (err) {
        throw err;
    }
};

exports.transformPlacedTrade = transformPlacedTrade;
exports.transformTrade = transformTrade;

// exports.user = user;
// exports.trades = trades;
// exports.singleTrade = singleTrade;