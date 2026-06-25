// public/api.js - Frontend API Handler

// ১. লগইন হ্যান্ডেলার
async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPass').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            localStorage.setItem("loggedInUser", data.user.username);
            localStorage.setItem("userBalance", data.user.balance);
            location.reload(); 
        } else {
            alert(data.message || "লগইন ব্যর্থ হয়েছে!");
        }
    } catch (error) {
        alert("সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না!");
    }
}

// ২. রেজিস্ট্রেশন হ্যান্ডেলার
async function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('regUser').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPass').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, phone, password })
        });
        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            location.reload();
        } else {
            alert(data.message || "নিবন্ধন ব্যর্থ হয়েছে!");
        }
    } catch (error) {
        alert("সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না!");
    }
}

// ৩. ডিপোজিট রিকোয়েস্ট ব্যাকএন্ডে পাঠানো
async function submitDeposit(depositData) {
    try {
        const response = await fetch('/api/deposit/request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(depositData)
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert("ডিপোজিট রিকোয়েস্ট পাঠাতে সমস্যা হয়েছে!");
    }
}

// ৪. উইথড্র রিকোয়েস্ট ব্যাকএন্ডে পাঠানো
async function submitWithdraw(withdrawData) {
    try {
        const response = await fetch('/api/withdraw/request', {
            method: 'POST',
            headers: { 'Content-Type':
