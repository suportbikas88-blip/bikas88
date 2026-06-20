const express = require('express');
const path = require('path');
const apiRoutes = require('./api');

const app = express();
const PORT = process.env.PORT || 3000;

// মিডলওয়্যার (JSON ডেটা রিসিভ করার জন্য)
app.express = express.json(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ফ্রন্টএন্ড ফাইলগুলো (html, css) স্ট্যাটিকভাবে সার্ভ করার জন্য
app.use(express.static(path.join(__dirname)));

// এপিআই রাউট লিংক করা
app.use('/api', apiRoutes);

// হোম রুট (index.html লোড করবে)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// সার্ভার স্টার্ট
app.listen(PORT, () => {
    console.log(`সার্ভারটি সফলভাবে চালু হয়েছে: http://localhost:${PORT}`);
});
