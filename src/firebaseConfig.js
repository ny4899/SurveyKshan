import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "login-fa7d9.firebaseapp.com",
  projectId: "login-fa7d9",
  storageBucket: "login-fa7d9.appspot.com",
  messagingSenderId: "76639512298",
  appId: "1:76639512298:web:4951bf19f8b4f957081993",
  measurementId: "G-NKN6MLKFEK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, app };
