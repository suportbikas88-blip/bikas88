const db = require('./firebase');

const connectDB = async () => {
    try {
        // ফায়ারবেস ফায়ারস্টোরের একটি সিম্পল চেক টেস্ট
        await db.collection('test').doc('ping').set({ timestamp: new Date() });
        console.log('Firebase Firestore Connected Successfully...');
    } catch (error) {
        console.error('Database Connection Error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;