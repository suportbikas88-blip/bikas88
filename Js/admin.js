/**
 * BIKAS88 - Withdraw & Payout Gateway Management
 * Author: Gemini AI Collaborator
 */

document.addEventListener("DOMContentLoaded", () => {
    // পেজ লোড হলে ডিফল্ট উইথড্র মেথড হিসেবে বিকাশ সিলেক্ট থাকবে
    selectWithdrawMethod('bkash');
});

let selectedWithdrawMethod = 'bkash';

// ১. উইথড্র মেথড সিলেক্ট করার ফাংশন
function selectWithdrawMethod(method) {
    selectedWithdrawMethod = method;
    
    // সব মেথড বাটন/কার্ড থেকে একটিভ ক্লাস রিমুভ করা
    document.querySelectorAll('.withdraw-method-card').forEach(card => {
        card.classList.remove('border-amber-500', 'bg-amber-500/10');
        card.classList.add('border-purple-900/60');
    });

    // সিলেক্টেড মেথড কার্ড হাইলাইট করা
    const activeCard = document.getElementById(`w-method-${method}`);
    if (activeCard) {
        activeCard.classList.remove('border-purple-900/60');
        activeCard.classList.add('border-amber-500', 'bg-amber-500/10');
    }
}

// ২. উইথড্র ফর্ম সাবমিশন হ্যান্ডেলার
function handleWithdrawSubmit(e) {
    e.preventDefault();

    const amountInput = document.getElementById('withdrawAmount');
    const accountInput = document.getElementById('withdrawAccount');
    const accountTypeInput = document.getElementById('accountType'); // Personal or Agent

    const amount = parseFloat(amountInput.value);
    const accountNumber = accountInput.value.trim();
    const accountType = accountTypeInput ? accountTypeInput.value : 'Personal';

    // লোকাল স্টোরেজ থেকে ইউজারের বর্তমান ব্যালেন্স চেক করা
    const currentBalance = parseFloat(localStorage.getItem("userBalance") || 0);

    // ভ্যালিডেশন চেক
    if (isNaN(amount) || amount < 500) {
        alert("দুঃখিত, সর্বনিম্ন ৫০০ টাকা উইথড্র করতে পারবেন!");
        return;
    }

    if (amount > currentBalance) {
        alert(`দুঃখিত, আপনার অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স নেই!\nবর্তমান ব্যালেন্স: ৳${currentBalance.toFixed(2)}`);
        return;
    }

    if (accountNumber.length < 11) {
        alert("আপনার ১১ ডিজিটের পেমেন্ট অ্যাকাউন্ট নাম্বারটি সঠিকভাবে দিন!");
        return;
    }

    // উইথড্রাল ডেটা অবজেক্ট (ব্যাকএন্ড বা অ্যাডমিন প্যানেলে পাঠানোর জন্য প্রস্তুত)
    const withdrawData = {
        username: localStorage.getItem("loggedInUser") || "Unknown User",
        method: selectedWithdrawMethod.toUpperCase(),
        amount: amount,
        account: accountNumber,
        type: accountType,
        date: new Date().toLocaleDateString('bn-BD'),
        status: "পেন্ডিং"
    };

    // লোকাল ব্যালেন্স থেকে টাকা কেটে নেওয়া এবং আপডেট করা (টেস্টিং ডেমো)
    const newBalance = currentBalance - amount;
    localStorage.setItem("userBalance", newBalance.toFixed(2));

    // সাময়িকভাবে লোকাল স্টোরেজে উইথড্র হিস্ট্রি সেভ করা
    saveWithdrawToLocalHistory(withdrawData);

    alert(`আপনার ৳${amount} উইথড্র রিকোয়েস্টটি সফলভাবে গ্রহণ করা হয়েছে!\nঅ্যাডমিন ভেরিফিকেশনের পর ৩০ মিনিট থেকে ১ ঘণ্টার মধ্যে টাকা পৌঁছে যাবে।`);
    
    // ড্যাশবোর্ডের ব্যালেন্স রিয়েল-টাইমে আপডেট করার জন্য (যদি ফাংশনটি থাকে)
    if (typeof checkUserSession === 'function') {
        checkUserSession();
    }

    // ফর্ম রিসেট
    document.getElementById('withdrawForm').reset();
}

// লোকাল হিস্ট্রিতে ডাটা পুশ করার ডেমো ফাংশন
function saveWithdrawToLocalHistory(data) {
    let history = JSON.parse(localStorage.getItem("withdrawHistory")) || [];
    history.unshift(data); // নতুন রিকোয়েস্ট সবার উপরে রাখবে
    localStorage.setItem("withdrawHistory", JSON.stringify(history));
}