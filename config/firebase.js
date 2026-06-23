const admin = require('firebase-admin');
require('dotenv').config();

// সার্ভিস অ্যাকাউন্ট ক্রেডেনশিয়াল লোড করা
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;