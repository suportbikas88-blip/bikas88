const express = require('express');
const router = express.Router();
const Deposit = require('../models/Deposit');
const Withdraw = require('../models/Withdraw');
const User = require('../models/User');

// পেন্ডিং ডিপোজিট অ্যাপ্রুভ করা
router.post('/deposit/approve', async (req, res) => {
    try {
        const { txid } = req.body;
        const deposit = await Deposit.findOne({ txid, status: 'পেন্ডিং' });
        if (!deposit) return res.status(404).json({ message: 'রিকোয়েস্টটি পাওয়া যায়নি!' });

        deposit.status = 'সফল';
        await deposit.save();

        // ইউজারের অ্যাকাউন্টে টাকা যোগ করা
        const user = await User.findOne({ username: deposit.username });
        if (user) {
            user.balance += deposit.amount;
            await user.save();
        }

        res.status(200).json({ message: 'ডিপোজিট সফলভাবে অ্যাপ্রুভ করা হয়েছে!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;