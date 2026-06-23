// api.js - BIKAS88 Frontend API Handler

// ১. লগইন রিকোয়েস্ট হ্যান্ডেলার
async function handleLogin(event) {
    event.preventDefault(); // পেজ রিফ্রেশ হওয়া বন্ধ করবে
    
    const username = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPass').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            alert(data.message);
            // ব্রাউজার মেমোরিতে ইউজার সেশন সেভ করা
            localStorage.setItem("loggedInUser", data.user.username);
            localStorage.setItem("userBalance", data.user.balance);
            
            closeModals();
            updateUIForLoggedInUser();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না!");
    }
}

// ২. রেজিস্ট্রেশন রিকোয়েস্ট হ্যান্ডেলার
async function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById('regUser').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPass').value;

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, phone, password })
        });

        const data = await response.json();

        if (data.success) {
            alert(data.message);
            closeModals();
            openLoginModal(); // অ্যাকাউন্ট খোলার পর সরাসরি লগইন উইন্ডো দেখাবে
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Registration Error:", error);
        alert("নিবন্ধন ব্যর্থ হয়েছে। সার্ভার চেক করুন।");
    }
}

// ৩. লগইন হওয়ার পর ইন্টারফেস (UI) আপডেট করার লজিক
function updateUIForLoggedInUser() {
    const user = localStorage.getItem("loggedInUser");
    const balance = localStorage.getItem("userBalance");
    
    const guestArea = document.getElementById('guestArea');
    const userProfileArea = document.getElementById('userProfileArea');
    const fullProfileSection = document.getElementById('fullProfileSection');
    const headerUsername = document.getElementById('headerUsername');
    const profileName = document.getElementById('profileName');

    if (user) {
        // গেস্ট বাটন (প্রবেশ/নিবন্ধন) হাইড করো
        if(guestArea) guestArea.classList.add('hidden');
        
        // হেডার প্রোফাইল শো করো
        if(userProfileArea) userProfileArea.classList.remove('hidden');
        if(headerUsername) headerUsername.innerText = user;
        
        // ড্যাশবোর্ডে নাম ও ব্যালেন্স দেখাও
        if(profileName) profileName.innerText = user;
        if(fullProfileSection) {
            fullProfileSection.innerHTML = `
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-sm font-bold text-white">${user.toUpperCase()}</h2>
                        <p class="text-xs text-green-400 font-mono mt-0.5">প্রধান ব্যালেন্স: ৳ ${parseFloat(balance).toFixed(2)}</p>
                    </div>
                    <button onclick="handleLogout()" class="text-xs bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg font-bold transition">লগআউট</button>
                </div>
            `;
        }
    }
}

// ৪. লগআউট হ্যান্ডেলার
function handleLogout() {
    localStorage.clear();
    alert("লগআউট সফল হয়েছে!");
    location.reload(); // পেজ রিলোড করে হোমপেজে নিয়ে যাবে
}

// পেজ লোড হওয়ার সাথে সাথে লগইন স্ট্যাটাস চেক করবে
document.addEventListener("DOMContentLoaded", updateUIForLoggedInUser);