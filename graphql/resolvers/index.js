const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');

const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        events.map(event => {
        return {
            ...event._doc,
            _id: event.id,
            date: new Date(event._doc.date).toISOString(),
            creator: user.bind(this, event.creator)
        };
        });
        return events;
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
        placedTrades: events.bind(this, user._doc.placedTrades)
        };
    } catch (err) {
        throw err;
    }
};
    
module.exports = {
    events: async () => {
        try {
        const events = await Event.find();
        return events.map(event => {
            return {
            ...event._doc,
            _id: event.id,
            date: new Date(event._doc.date).toISOString(),
            creator: user.bind(this, event._doc.creator)
            };
        });
        } catch (err) {
        throw err;
        }
    },
    placeTrade: async args => {
        const event = new Event({
        ticker: args.eventInput.ticker,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: '60456346b490ca5590f171bf'
        });
        let placedTrade;
        try {
        const result = await event.save();
        placedTrade = {
            ...result._doc,
            _id: result._doc._id.toString(),
            date: new Date(event._doc.date).toISOString(),
            creator: user.bind(this, result._doc.creator)
        };
        const creator = await User.findById('60456346b490ca5590f171bf');
    
        if (!creator) {
            throw new Error('User not found.');
        }
        creator.placedTrades.push(event);
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