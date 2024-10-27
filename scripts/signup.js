import { auth, db, provider } from './config';
import { createUserWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const googleSignUpButton = document.getElementById('google-sign-up');

googleSignUpButton.addEventListener('click', async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            displayName: user.displayName || user.email, // Default to email if displayName is not available
            createdAt: new Date(),
        });
        console.log('Signed up with Google:', user);
        window.location.href = 'homepage.html';  
    } catch (error) {
        console.error('Error during Google sign-up:', error);
        alert('An error occurred during Google sign-up: ' + error.message);
    }
});

document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
            email: email,
            displayName: email, // Store email as display name
            createdAt: new Date(),
        });

        alert("User registered successfully. You can log in now.");
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error during email signup:', error);
        alert("Signup failed: " + error.message);
    }
});
