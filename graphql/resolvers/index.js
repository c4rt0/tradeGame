const bcrypt = require('bcryptjs');

const Trade = require('../../models/trade');
const User = require('../../models/user');
const PlacedTrade = require('../../models/placedTrade');

const trades = async tradeIds => {
    try {
        const trades = await Trade.find({ _id: { $in: tradeIds } });
        trades.map(trade => {
        return {
            ...trade._doc,
            _id: trade.id,
            date: new Date(trade._doc.date).toISOString(),
            trader: user.bind(this, trade.trader)
        };
        });
        return trades;
    } catch (err) {
        throw err;
    }
};
    
const user = async userId => {
    try {
        const user = await User.findById(userId);
        return {
        ...user._doc,
        _id: user.id,
        createdTrades: trades.bind(this, user._doc.createdTrades)
        };
    } catch (err) {
        throw err;
    }
};

module.exports = {
    trades: async () => {
        try {
        const trades = await Trade.find();
        return trades.map(trade => {
            return {
            ...trade._doc,
            _id: trade.id,
            date: new Date(trade._doc.date).toISOString(),
            trader: user.bind(this, trade._doc.trader)
            };
        });
        } catch (err) {
        throw err;
        }
    },
    placedTrades: async () => {
        try{
            const placedTrades = await PlacedTrade.find();
            return placedTrades.map(placedTrade => {
                return { 
                    ...placedTrade._doc, 
                    _id: placedTrade.id, 
                    createdAt: new Date(placedTrade._doc.createdAt).toISOString(),
                    updatedAt: new Date(placedTrade._doc.updatedAt).toISOString()
                };
            });
        } catch(err) {
            throw err;
        }
    },
    createTrade: async args => {
        const trade = new Trade({
        ticker: args.tradeInput.ticker,
        description: args.tradeInput.description,
        price: +args.tradeInput.price,
        date: new Date(args.tradeInput.date),
        trader: '60456346b490ca5590f171bf'
        });
        let createdTrade;
        try {
        const result = await trade.save();
        createdTrade = {
            ...result._doc,
            _id: result._doc._id.toString(),
            date: new Date(trade._doc.date).toISOString(),
            trader: user.bind(this, result._doc.trader)
        };
        const trader = await User.findById('60456346b490ca5590f171bf');
    
        if (!trader) {
            throw new Error('User not found.');
        }
        trader.createdTrades.push(trade);
        await trader.save();
    
        return createdTrade;
        } catch (err) {
        console.log(err);
        throw err;
        }
    },
    createUser: async args => {
        try {
        const existingUser = await User.findOne({ email: args.userInput.email });
        if (existingUser) {
            throw new Error('User exists already.');
        }
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
    
        const user = new User({
            email: args.userInput.email,
            password: hashedPassword
        });
    
        const result = await user.save();
    
        return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
        throw err;
        }
    },
    placeTrade: async args => {
        const fetchedTrade = await Trade.findOne({_id: args.tradeId});
        const placedTrade = new PlacedTrade({
            user: '60456346b490ca5590f171bf',
            trade: fetchedTrade
        });
        const result = await placedTrade.save();
        return  { 
            ...result._doc, 
            _id: result.id,
            createdAt: new Date(result._doc.createdAt).toISOString(),
            updatedAt: new Date(result._doc.updatedAt).toISOString()
        };
    }
};