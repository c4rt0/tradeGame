const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    createdTrades: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Trade'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);