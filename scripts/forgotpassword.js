
import { auth } from './config.js';
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

document.getElementById('forgot-password-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;

    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset link sent! Please check your email.');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error sending password reset email:', error);
        alert('Error: ' + error.message);
    }
});
