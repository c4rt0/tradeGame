const bcrypt = require('bcryptjs');

const Portfolio = require('../../models/portfolio');
const User = require('../../models/user');

const portfolios = async portfolioIds => {
    try {
        const portfolios = await Portfolio.find({ _id: { $in: portfolioIds } });
        portfolios.map(portfolio => {
        return {
            ...portfolio._doc,
            _id: portfolio.id,
            date: new Date(portfolio._doc.date).toISOString(),
            creator: user.bind(this, portfolio.creator)
        };
        });
        return portfolios;
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
        placedTrades: portfolios.bind(this, user._doc.placedTrades)
        };
    } catch (err) {
        throw err;
    }
};
    
module.exports = {
    portfolios: async () => {
        try {
        const portfolios = await Portfolio.find();
        return portfolios.map(portfolio => {
            return {
            ...portfolio._doc,
            _id: portfolio.id,
            date: new Date(portfolio._doc.date).toISOString(),
            creator: user.bind(this, portfolio._doc.creator)
            };
        });
        } catch (err) {
        throw err;
        }
    },
    placeTrade: async args => {
        const portfolio = new Portfolio({
        ticker: args.portfolioInput.ticker,
        description: args.portfolioInput.description,
        price: +args.portfolioInput.price,
        date: new Date(args.portfolioInput.date),
        creator: '6043b9a6b805a717e8b5e1cf'
        });
        let placedTrade;
        try {
        const result = await portfolio.save();
        placedTrade = {
            ...result._doc,
            _id: result._doc._id.toString(),
            date: new Date(portfolio._doc.date).toISOString(),
            creator: user.bind(this, result._doc.creator)
        };
        const creator = await User.findById('6043b9a6b805a717e8b5e1cf');
    
        if (!creator) {
            throw new Error('User not found.');
        }
        creator.placedTrades.push(portfolio);
        await creator.save();
    
        return placedTrade;
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
    }
};