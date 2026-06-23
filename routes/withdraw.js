const express = require('express');
const router = express.Router();
const Withdraw = require('../models/Withdraw');
const User = require('../models/User');

// উইথড্র রিকোয়েস্ট সাবমিট করা
router.post('/request', async (req, res) => {
    try {
        const { username, method, amount, account, type } = req.body;
        
        // ইউজারের ব্যালেন্স চেক
        const user = await User.findOne({ username });
        if (!user || user.balance < amount) return res.status(400).json({ message: 'পর্যাপ্ত ব্যালেন্স নেই!' });

        // ব্যালেন্স কেটে নেওয়া
        user.balance -= amount;
        await user.save();

        const newWithdraw = new Withdraw({ username, method, amount, account, type });
        await newWithdraw.save();
        res.status(201).json({ message: 'উইথড্র রিকোয়েস্ট সফলভাবে সাবমিট হয়েছে!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;