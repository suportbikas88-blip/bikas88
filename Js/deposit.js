/**
 * BIKAS88 - Deposit & Payment Gateway Management
 * Author: Gemini AI Collaborator
 */

document.addEventListener("DOMContentLoaded", () => {
    // পেজ লোড হলে ডিফল্ট মেথড হিসেবে বিকাশ সিলেক্ট থাকবে
    selectPaymentMethod('bkash');
});

let selectedMethod = 'bkash';

// ১. পেমেন্ট মেথড সিলেক্ট করার ফাংশন
function selectPaymentMethod(method) {
    selectedMethod = method;
    
    // সব মেথড কার্ড থেকে একটিভ বর্ডার রিমুভ করা
    document.querySelectorAll('.method-card').forEach(card => {
        card.classList.remove('border-amber-500', 'bg-amber-500/10');
        card.classList.add('border-purple-900/60');
    });

    // সিলেক্টেড মেথড কার্ড হাইলাইট করা
    const activeCard = document.getElementById(`method-${method}`);
    if (activeCard) {
        activeCard.classList.remove('border-purple-900/60');
        activeCard.classList.add('border-amber-500', 'bg-amber-500/10');
    }

    // পেমেন্ট মেথড অনুযায়ী ক্যাশ-আউট বা সেন্ড-মানি নাম্বার পরিবর্তন
    const targetNumberField = document.getElementById('gatewayNumber');
    if (targetNumberField) {
        if (method === 'bkash') {
            targetNumberField.innerText = "017XXXXXXXX (Agent)";
        } else if (method === 'nagad') {
            targetNumberField.innerText = "019XXXXXXXX (Personal)";
        } else if (method === 'rocket') {
            targetNumberField.innerText = "018XXXXXXXX (Agent)";
        }
    }
}

// ২. গেটওয়ে নাম্বার কপি করার ফাংশন
function copyGatewayNumber() {
    const numberText = document.getElementById('gatewayNumber').innerText.split(' ')[0];
    
    navigator.clipboard.writeText(numberText).then(() => {
        alert("নাম্বারটি কপি করা হয়েছে: " + numberText);
    }).catch(err => {
        console.error("কপি করতে সমস্যা হয়েছে: ", err);
    });
}

// ৩. ডিপোজিট ফর্ম সাবমিশন হ্যান্ডেলার
function handleDepositSubmit(e) {
    e.preventDefault();

    const amountInput = document.getElementById('depositAmount');
    const txidInput = document.getElementById('depositTxID');
    const senderInput = document.getElementById('senderNumber');

    const amount = parseFloat(amountInput.value);
    const txid = txidInput.value.trim();
    const senderNumber = senderInput.value.trim();

    // ভ্যালিডেশন চেক
    if (isNaN(amount) || amount < 200) {
        alert("দুঃখিত, সর্বনিম্ন ২০০ টাকা ডিপোজিট করতে পারবেন!");
        return;
    }

    if (txid.length < 8) {
        alert("অনুগ্রহ করে সঠিক ৮ বা ১০ ডিজিটের ট্রানজেকশন আইডি (TxID) দিন!");
        return;
    }

    if (senderNumber.length < 11) {
        alert("আপনার ১১ ডিজিটের মোবাইল নাম্বারটি সঠিকভাবে দিন!");
        return;
    }

    // ডিপোজিট ডেটা অবজেক্ট (ব্যাকএন্ড এ পাঠানোর জন্য প্রস্তুত)
    const depositData = {
        username: localStorage.getItem("loggedInUser") || "Unknown User",
        method: selectedMethod.toUpperCase(),
        amount: amount,
        txid: txid,
        sender: senderNumber,
        date: new Date().toLocaleDateString('bn-BD'),
        status: "পেন্ডিং"
    };

    // সাময়িকভাবে লোকাল স্টোরেজে হিস্ট্রি সেভ করা (টেস্টিং পারপাস)
    saveDepositToLocalHistory(depositData);

    alert(`আপনার ৳${amount} ডিপোজিট রিকোয়েস্টটি সফলভাবে সাবমিট হয়েছে!\nঅ্যাডমিন ভেরিফিকেশনের পর ৫-১০ মিনিটের মধ্যে ব্যালেন্স যোগ হবে।`);
    
    // ফর্ম রিসেট
    document.getElementById('depositForm').reset();
}

// লোকাল হিস্ট্রিতে ডাটা পুশ করার ডেমো ফাংশন
function saveDepositToLocalHistory(data) {
    let history = JSON.parse(localStorage.getItem("depositHistory")) || [];
    history.unshift(data); // নতুন রিকোয়েস্ট সবার উপরে রাখবে
    localStorage.setItem("depositHistory", JSON.stringify(history));
}