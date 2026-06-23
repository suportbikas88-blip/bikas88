const express = require('express');
const cors = require('cors');
const path = require('path');
const admin = require('firebase-admin');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ১. মিডলওয়্যারস (Middlewares)
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // public ফোল্ডারের ফাইল সার্ভ করা

// ২. ফায়ারবেস কানেকশন (Firebase Connection with Parse Key Error Fix)
try {
    if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
        console.error("Error: FIREBASE_SERVICE_ACCOUNT is missing in Environment Variables!");
    } else {
        // রেন্ডার থেকে এক লাইনের JSON স্ট্রিংটি আনা
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        
        // প্রাইভেট কী-এর ভেতরের \n বা নিউ-লাইনগুলোকে ঠিক করা (Unparsed DER bytes error fix)
        if (serviceAccount.private_key) {
            serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
        }

        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
            console.log("🔥 Firebase Admin SDK Connected Successfully!");
        }
    }
} catch (error) {
    console.error("❌ Firebase Initialization Error:", error.message);
}

// ৩. মঙ্গুজ/ডাটাবেজ কানেকশন (যদি কনফিগার করা থাকে)
const connectDB = require('./config/db');
if (typeof connectDB === 'function') {
    connectDB();
}

// ৪. রাউটস মাউন্টিং (Routes)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/deposit', require('./routes/deposit'));
app.use('/api/withdraw', require('./routes/withdraw'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/referral', require('./routes/referral'));

// ৫. প্রধান রুট বা হোমপেজ (যা "Cannot GET /" বা "Not Found" এরর দূর করবে)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ৬. রেন্ডার বা লোকাল পোর্ট ডাইনামিকালি সেট করা
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 BIKAS88 Server Running on Port ${PORT}`));