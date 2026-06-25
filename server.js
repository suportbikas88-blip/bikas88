const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

// ১. সিকিউরিটি এবং মিডলওয়্যার কনফিগারেশন
app.use(helmet()); 
app.use(cors());
app.use(express.json());

// ২. রেট লিমিট (Bot Attack এবং Brute Force ঠেকাতে)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // ১৫ মিনিট
    max: 100, 
    message: { success: false, message: "Too many requests, please try again later." }
});
app.use("/api/", limiter); 

// Public folder serve (Frontend Static Files)
app.use(express.static(path.join(__dirname, "public")));

// ৩. মঙ্গোডিবি (MongoDB) কানেকশন সেটআপ
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bikas88";
mongoose.connect(MONGO_URI)
    .then(() => console.log("🍃 MongoDB Database Connected Successfully..."))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// ৪. হেলথ চেক রুট (Render/Railway আপটাইম মনিটরিংয়ের জন্য)
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date() });
});

// ৫. সঠিক এপিআই রাউটস কনফিগারেশন (ZIP ফাইল অনুযায়ী)
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/deposit", require("./routes/deposit"));
app.use("/api/withdraw", require("./routes/withdraw"));
app.use("/api/referral", require("./routes/referral"));

// হোমপেজ রেন্ডারিং
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found!" });
});

// সার্ভার লিসেনিং
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
