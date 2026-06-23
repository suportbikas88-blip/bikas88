const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema({
    referrer: { type: String, required: true }, // কে রেফার করেছে
    referredUser: { type: String, required: true, unique: true }, // কে জয়েন করেছে
    bonusEarned: { type: Number, default: 150.00 }, // কত বোনাস পেলো
    status: { type: String, default: 'সক্রিয়' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Referral', ReferralSchema);