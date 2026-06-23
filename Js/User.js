/**
 * BIKAS88 - Database User Schema (Mongoose / MongoDB)
 * Author: Gemini AI Collaborator
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'ইউজারনেম দেওয়া বাধ্যতামূলক'],
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [3, 'ইউজারনেম সর্বনিম্ন ৩ অক্ষরের হতে হবে']
    },
    phone: {
        type: String,
        required: [true, 'মোবাইল নাম্বার দেওয়া বাধ্যতামূলক'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'পাসওয়ার্ড দেওয়া বাধ্যতামূলক'],
        minlength: [6, 'পাসওয়ার্ড সর্বনিম্ন ৬ অক্ষরের হতে হবে']
    },
    balance: {
        type: Number,
        default: 0.00 // নতুন অ্যাকাউন্ট খুললে ডিফল্ট ব্যালেন্স ০ টাকা থাকবে
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user' // ডিফল্ট রোল হবে সাধারণ ইউজার
    },
    referredBy: {
        type: String,
        default: null // কে রেফার করেছে তার ইউজারনেম ট্র্যাক করার জন্য
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// পাসওয়ার্ড হ্যাশ করার জন্য বা অন্যান্য মেথড এখানে যুক্ত করতে পারেন

module.exports = mongoose.model('User', UserSchema);