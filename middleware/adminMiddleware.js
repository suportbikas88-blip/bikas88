const adminMiddleware = (req, res, next) => {
    // এই মিডলওয়্যারটি সর্বদা authMiddleware এর পরে বসাতে হবে
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ success: false, message: 'অনুমতি নেই, এটি শুধুমাত্র অ্যাডমিনের জন্য সংরক্ষিত!' });
    }
};

module.exports = adminMiddleware;