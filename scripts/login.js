import { auth, provider, db } from './config.js';  
import { signInWithEmailAndPassword, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js'
import { doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js'

const googleSignUpButton = document.getElementById('google-sign-up'); 

googleSignUpButton.addEventListener('click', async (e) => { e.preventDefault();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('Logged in with Google:', user);

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        // Check if the user document exists
        if (!docSnap.exists()) {
            // If it doesn't exist, create a new document
            await setDoc(docRef, {
                email: user.email,
                displayName: user.displayName || user.email, // Default to email if displayName is not available
                createdAt: new Date(),
            });
        } else {
            console.log("User data:", docSnap.data());
        }

        alert('Logged in successfully!');
        window.location.href = 'homepage.html';
    } catch (error) {
        console.error('Error during Google sign-in:', error);
        alert('An error occurred during Google sign-in: ' + error.message);
    }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully");

        const user = auth.currentUser;
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("User data:", docSnap.data());
        } else {
            console.log("No such document!");
        }

        window.location.href = 'homepage.html';
    } catch (error) {
        console.error('Error during email login:', error);
        alert("Login failed: " + error.message);
    }
});
