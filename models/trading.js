const mongoose = require('mongoose');

const Schema = mongoose.Schema; // constructor

const tradingSchema = new Schema (
    {
        trade: {
            type: Schema.Types.ObjectId,
            ref: 'Trade'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Trading', tradingSchema);