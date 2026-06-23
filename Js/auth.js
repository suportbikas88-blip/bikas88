/**
 * BIKAS88 - Authentication & User Session Management
 * Author: Gemini AI Collaborator
 */

document.addEventListener("DOMContentLoaded", () => {
    // ড্যাশবোর্ড সিকিউরিটি এবং ডেটা লোড চেক
    checkUserSession();
});

// ১. ড্যাশবোর্ড এবং প্রোফাইল সেশন চেক করা
function checkUserSession() {
    const dashUsername = document.getElementById('dashUsername');
    const dashBalance = document.getElementById('dashBalance');

    // আমরা যদি ড্যাশবোর্ড পেজে থাকি তখনই শুধু এই লজিক কাজ করবে
    if (dashUsername && dashBalance) {
        const loggedInUser = localStorage.getItem("loggedInUser");
        const userBalance = localStorage.getItem("userBalance");

        // সেশন না থাকলে হোমপেজে রিডাইরেক্ট করবে
        if (!loggedInUser) {
            alert("অনুগ্রহ করে প্রথমে লগইন করুন!");
            window.location.href = "index.html";
            return;
        }

        // UI-তে ডাইনামিক ডেটা সেট করা
        dashUsername.innerText = loggedInUser.toUpperCase();
        dashBalance.innerText = parseFloat(userBalance || 0).toFixed(2);
    }
}

// ২. লগইন ও রেজিস্ট্রেশন ফর্ম সাবমিশন হ্যান্ডেলার
function handleFormSubmit(e) {
    e.preventDefault();
    
    const usernameInput = document.getElementById('authUsername');
    const passwordInput = document.getElementById('authPassword');
    const phoneInput = document.getElementById('authPhone');
    const submitBtn = document.getElementById('authSubmitBtn');

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!username || !password) {
        alert("ইউজারনেম এবং পাসওয়ার্ড সঠিকভাবে দিন!");
        return;
    }

    // বাটন টেক্সট চেক করে লগইন নাকি রেজিস্ট্রেশন তা নির্ধারণ করা
    if (submitBtn.innerText === "প্রবেশ করুন") {
        // --- লগইন লজিক ---
        if (username.toLowerCase() === "admin" && password === "admin123") {
            alert("অ্যাডমিন লগইন সফল হয়েছে!");
            window.location.href = "admin.html"; // অ্যাডমিন প্যানেলে রিডাইরেক্ট
            return;
        }

        // সাধারণ ইউজার সেশন সেট করা (টেস্ট ডেমো ব্যালেন্সসহ)
        localStorage.setItem("loggedInUser", username);
        localStorage.setItem("userBalance", "5000.00"); // ডেমো ব্যালেন্স ৫০০০ BDT

        alert(`স্বাগতম, ${username}! লগইন সফল হয়েছে।`);
        window.location.href = "dashboard.html"; // ড্যাশবোর্ডে রিডাইরেক্ট

    } else {
        // --- রেজিস্ট্রেশন (নিবন্ধন) লজিক ---
        if (!phone) {
            alert("মোবাইল নাম্বার দেওয়া বাধ্যতামূলক!");
            return;
        }

        alert("নিবন্ধন সফল হয়েছে! অনুগ্রহ করে নতুন অ্যাকাউন্ট দিয়ে প্রবেশ করুন।");
        
        // রেজিস্ট্রেশন সফল হলে ফর্ম ক্লিয়ার করে লগইন ট্যাবে সুইচ করবে
        if (typeof switchTab === 'function') {
            switchTab('login');
        }
    }
    
    // প্যানেল ক্লোজ করা (যদি ফাংশনটি HTML-এ থাকে)
    if (typeof closeAllPanels === 'function') {
        closeAllPanels();
    }
}

// ৩. ইউজার লগআউট ফাংশন
function handleLogout() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userBalance");
    alert("লগআউট সফল হয়েছে!");
    window.location.href = "index.html";
}

// ৪. অ্যাডমিন লগআউট ফাংশন
function adminLogout() {
    alert("অ্যাডমিন প্যানেল থেকে লগআউট করা হচ্ছে...");
    window.location.href = "index.html";
}