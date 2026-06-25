const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

// ১. সিকিউরিটি এবং মিডলওয়্যার কনফিগারেশন
app.use(helmet()); // সিকিউরিটি হেডার এনাবল করার জন্য
app.use(cors());
app.use(express.json());

// ২. রেট লিমিট (Bot Attack এবং Brute Force ঠেকাতে)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // ১৫ মিনিট
    max: 100, // প্রতি IP থেকে ১৫ মিনিটে সর্বোচ্চ ১০০টি রিকোয়েস্ট
    message: { success: false, message: "Too many requests, please try again later." }
});
app.use("/api/", limiter); // শুধুমাত্র API রুটগুলোর জন্য লিমিট প্রযোজ্য হবে

// Public folder serve
app.use(express.static(path.join(__dirname, "public")));

// ৩. ফায়ারবেস অ্যাডমিন এসডিকে (এনভায়রনমেন্ট ভ্যারিয়েবল দিয়ে ফিক্সড)
try {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // \n স্পেসগুলোকে সঠিকভাবে হ্যান্ডেল করার জন্য replace ব্যবহার করা হয়েছে
                privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") : undefined
            })
        });

        console.log("🔥 Firebase Admin SDK Connected via Environment Variables!");
    }
} catch (error) {
    console.error("❌ Firebase Initialization Error:", error.message);
}

// ৪. হেলথ চেক রুট (Render/Railway আপটাইম মনিটরিংয়ের জন্য)
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date() });
});

// ৫. এপিআই রাউটস (সচল বা আনকমেন্ট করা হয়েছে)
app.use("/api/users", require("./routes/user"));
app.use("/api/transactions", require("./routes/transaction"));

// Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});
