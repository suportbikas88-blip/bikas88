const mongoose = require('mongoose');

const DepositSchema = new mongoose.Schema({
    username: { type: String, required: true },
    method: { type: String, enum: ['BKASH', 'NAGAD', 'ROCKET'], required: true },
    amount: { type: Number, required: true },
    txid: { type: String, required: true, unique: true },
    sender: { type: String, required: true },
    status: { type: String, enum: ['পেন্ডিং', 'সফল', 'বাতিল'], default: 'পেন্ডিং' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Deposit', DepositSchema);