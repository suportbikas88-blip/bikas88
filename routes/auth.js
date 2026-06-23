const express = require('express');
const router = express.Router();
const User = require('../models/User');

// সাইন-আপ / নিবন্ধন রাউট
router.post('/register', async (req, res) => {
    try {
        const { username, phone, password, referredBy } = req.body;
        
        // ইউজার অলরেডি আছে কিনা চেক
        const userExists = await User.findOne({ $or: [{ username }, { phone }] });
        if (userExists) return res.status(400).json({ message: 'ইউজারনেম বা মোবাইল নাম্বারটি ইতিপূর্বে ব্যবহৃত হয়েছে!' });

        const newUser = new User({ username, phone, password, referredBy });
        await newUser.save();
        res.status(201).json({ message: 'নিবন্ধন সফল হয়েছে!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// লগইন রাউট
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'ভুল ইউজারনেম অথবা পাসওয়ার্ড!' });
        }
        
        res.status(200).json({ message: 'লগইন সফল!', user: { username: user.username, role: user.role, balance: user.balance } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;