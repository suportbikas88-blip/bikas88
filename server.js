const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = async () => {
    const db = require('./config/db');
    await db();
};

const app = express();

// মিডলওয়্যারস
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // স্ট্যাটিক ফাইল সার্ভ করার জন্য

// ডাটাবেজ কানেক্ট করা
connectDB();

// রাউটস মাউন্টিং
app.use('/api/auth', require('./routes/auth'));
app.use('/api/deposit', require('./routes/deposit'));
app.use('/api/withdraw', require('./routes/withdraw'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/referral', require('./routes/referral'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`BIKAS88 Server Running on Port ${PORT}`));