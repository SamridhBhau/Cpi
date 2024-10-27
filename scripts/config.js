import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js'
import { getAuth, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyAUJRrHoc4OKhAQ9NkwDyKsvm2D3lEsRCM",
  authDomain: "stockportfolio-d5bce.firebaseapp.com",
  projectId: "stockportfolio-d5bce",
  storageBucket: "stockportfolio-d5bce.appspot.com",
  messagingSenderId: "213830389784",
  appId: "1:213830389784:web:92c50ecf3dacacaeb0f36d",
  measurementId: "G-S40ELPJ62R"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
