const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ success: false, message: 'প্রবেশাধিকার নেই, টোকেন পাওয়া যায়নি!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // ইউজার অবজেক্ট রিকোয়েস্টে পাস করা
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'টোকেনটি সঠিক নয় বা মেয়াদোত্তীর্ণ!' });
    }
};

module.exports = authMiddleware;