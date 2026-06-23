const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// ফায়ারবেস কানেকশন (নতুন এবং ১০০% নিরাপদ পদ্ধতি)
try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    
    if (!privateKey) {
        console.error("Error: FIREBASE_PRIVATE_KEY is missing!");
    } else {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: "bikas88",
                    clientEmail: "firebase-adminsdk-fbsvc@bikas88.iam.gserviceaccount.com",
                    privateKey: privateKey.replace(/\\n/g, '\n')
                })
            });
            console.log("🔥 Firebase Admin SDK Connected Successfully!");
        }
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
