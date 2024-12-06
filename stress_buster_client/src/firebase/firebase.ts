/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined, // Add undefined for optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();

// Define the return type for your functions
type AuthResponse = { success: boolean, message?: string, data?: any };

async function LoginWithGoogle(): Promise<AuthResponse> {
  auth.languageCode = "it";

  try {
    const data = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(data);
    const token = credential?.accessToken || null; // Use optional chaining
    const user = data.user;
    console.log(credential);
    console.log(user);

    // Prepare the headers for the API request
    const headers = {
      Authorization: `Bearer ${user.accessToken}`,
    };
    console.log(headers);

    // Send the token to your backend for further handling
    const signupResponse = await axios.post(
      `${process.env.REACT_APP_API_LINK}/signupWithGoogle`,
      {},
      { headers, withCredentials: true }
    );

    return { success: true, data: signupResponse.data };
  } catch (error) {
    console.error("Error during Google login:", error.message);
    return { success: false, message: error.message };
  }
}



export { LoginWithGoogle };
