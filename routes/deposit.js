const express = require('express');
const router = express.Router();
const Deposit = require('../models/Deposit');

// ডিপোজিট রিকোয়েস্ট সাবমিট করা
router.post('/request', async (req, res) => {
    try {
        const { username, method, amount, txid, sender } = req.body;
        
        const txExists = await Deposit.findOne({ txid });
        if (txExists) return res.status(400).json({ message: 'এই TxID টি ইতিপূর্বে ব্যবহৃত হয়েছে!' });

        const newDeposit = new Deposit({ username, method, amount, txid, sender });
        await newDeposit.save();
        res.status(201).json({ message: 'ডিপোজিট রিকোয়েস্ট সফলভাবে সাবমিট হয়েছে!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;