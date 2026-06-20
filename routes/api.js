const express = require('express');
const router = express.Router();

// মক ডাটাবেজ (টেস্টিং এর জন্য)
const users = [];

// রেজিস্ট্রেশন API
router.post('/register', (req, res) => {
    const { username, password, phone } = req.body;

    if (!username || !password || !phone) {
        return res.status(400).json({ error: 'সবগুলো ঘর সঠিকভাবে পূরণ করুন।' });
    }

    // ইউজার অলরেডি আছে কিনা চেক
    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.status(400).json({ error: 'এই ইউজারনেমটি ইতিমধ্যে নিবন্ধিত।' });
    }

    // নতুন ইউজার সেভ
    const newUser = { username, password, phone };
    users.push(newUser);

    return res.status(201).json({ message: 'নিবন্ধন সফল হয়েছে! অনুগ্রহ করে প্রবেশ করুন।' });
});

// লগইন API
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'ইউজারনেম এবং পাসওয়ার্ড প্রদান করুন।' });
    }

    // ইউজার ভেরিফিকেশন
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'ভুল ইউজারনেম অথবা পাসওয়ার্ড!' });
    }

    return res.json({ 
        message: 'সফলভাবে প্রবেশ করেছেন! BIKAS88 এ আপনাকে স্বাগতম।',
        user: { username: user.username }
    });
});

module.exports = router;
