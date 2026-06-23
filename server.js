const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// ফায়ারবেস সিক্রেট ফাইল রিড করার নিয়ম
try {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert('/opt/render/project/src/firebase.json')
        });
        console.log("🔥 Firebase Admin SDK Connected Successfully via File!");
    }
} catch (error) {
    console.error("❌ Firebase Initialization Error:", error.message);
}

// হোমপেজ রুট
app.get('/', (req, res) => {
    res.send("Bikas88 Server is Running Successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server Running on Port ${PORT}`));
