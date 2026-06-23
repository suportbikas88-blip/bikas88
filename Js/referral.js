/**
 * BIKAS88 - Referral & Affiliate Program Management
 * Author: Gemini AI Collaborator
 */

document.addEventListener("DOMContentLoaded", () => {
    // পেজ লোড হলে রেফারেল ড্যাশবোর্ড ডেটা জেনারেট ও রেন্ডার করবে
    initReferralDashboard();
});

// ১. রেফারেল ড্যাশবোর্ড ইনিশিয়ালাইজ করার মেইন ফাংশন
function initReferralDashboard() {
    const loggedInUser = localStorage.getItem("loggedInUser");

    // যদি ইউজার লগইন না থাকে, তবে সে রেফারেল ডেটা দেখতে পারবে না
    if (!loggedInUser) {
        console.log("Referral System: No user logged in.");
        return;
    }

    // ডাইনামিক রেফারেল লিঙ্ক তৈরি করা (আপনার সাইটের ডোমেইন অনুযায়ী স্বয়ংক্রিয়ভাবে অ্যাডজাস্ট হবে)
    const siteUrl = window.location.origin;
    const referralLink = `${siteUrl}/index.html?ref=${loggedInUser}`;

    // UI-তে রেফার লিঙ্ক এবং কোড সেট করা
    const refLinkField = document.getElementById("referralLinkInput");
    const refCodeField = document.getElementById("referralCodeDisplay");

    if (refLinkField) refLinkField.value = referralLink;
    if (refCodeField) refCodeField.innerText = loggedInUser.toUpperCase();

    // রেফারেল স্ট্যাটিস্টিক্স এবং বন্ধুদের তালিকা রেন্ডার করা
    renderReferralData();
}

// ২. রেফার লিঙ্ক কপি করার ফাংশন
function copyReferralLink() {
    const refLinkField = document.getElementById("referralLinkInput");
    if (!refLinkField) return;

    refLinkField.select();
    refLinkField.setSelectionRange(0, 99999); // মোবাইল ডিভাইসের জন্য

    navigator.clipboard.writeText(refLinkField.value).then(() => {
        alert("আপনার রেফারেল লিঙ্কটি কপি হয়েছে! বন্ধুদের সাথে শেয়ার করুন।");
    }).catch(err => {
        console.error("লিঙ্ক কপি করতে ব্যর্থ:", err);
    });
}

// ৩. রেফারেল স্ট্যাটস এবং টেবিল ডেটা রেন্ডার করা
function renderReferralData() {
    // লোকাল স্টোরেজ থেকে রেফারেল ডেটা রিড করা (ডাটাবেজ না থাকা পর্যন্ত ডেমো ডেটা হিসেবে কাজ করবে)
    let refData = JSON.parse(localStorage.getItem("referralStats"));

    // যদি আগে কোনো রেফারেল ডাটা না থাকে, তবে একটি ডেমো ডাটা সেট করে নেওয়া
    if (!refData) {
        refData = {
            totalClicks: 24,
            joinedFriends: 3,
            totalEarnings: 450.00,
            friendsList: [
                { username: "asif_gaming", date: "২০/০৬/২০২৬", bonusEarned: 150.00, status: "সক্রিয়" },
                { username: "sohel88", date: "২১/০৬/২০২৬