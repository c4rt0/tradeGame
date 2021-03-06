const mongoose = require('mongoose');

const schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Event', eventSchema);