const express = require('express');
const router = express.Router();
const Referral = require('../models/Referral');

// কোনো নির্দিষ্ট ইউজারের রেফারেল হিস্ট্রি দেখা
router.get('/:username', async (req, res) => {
    try {
        const referrals = await Referral.find({ referrer: req.params.username });
        res.status(200).json(referrals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;