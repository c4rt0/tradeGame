const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tradeSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true
    },
    description : {
         type: String,
         required: true
    },
    // price: {
    //     type: Number,
    //     required: true
    // },
    // date: {
    //     type: Date,
    //     required: true
    // },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Trade', tradeSchema);