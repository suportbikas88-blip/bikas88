const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Public folder serve
app.use(express.static(path.join(__dirname, "public")));

// Firebase Admin SDK
try {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert("/opt/render/project/src/firebase.json")
        });

        console.log("🔥 Firebase Admin SDK Connected Successfully!");
    }
} catch (error) {
    console.error("❌ Firebase Initialization Error:", error.message);
}

// API Routes
// app.use("/api/users", require("./routes/user"));
// app.use("/api/transactions", require("./routes/transaction"));
// এখানে আপনার অন্যান্য routes থাকলে যোগ করুন

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
