const mongoose = require('mongoose');

const WithdrawSchema = new mongoose.Schema({
    username: { type: String, required: true },
    method: { type: String, enum: ['BKASH', 'NAGAD', 'ROCKET'], required: true },
    amount: { type: Number, required: true },
    account: { type: String, required: true },
    type: { type: String, enum: ['Personal', 'Agent'], default: 'Personal' },
    status: { type: String, enum: ['পেন্ডিং', 'সফল', 'বাতিল'], default: 'পেন্ডিং' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Withdraw', WithdrawSchema);