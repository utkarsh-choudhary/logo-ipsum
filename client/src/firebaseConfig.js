// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, } from "firebase/auth"; // Ensure AppleAuthProvider is imported

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkmb8cWXhL2NcRSLnvwBhdlEej3cE_jyo",
  authDomain: "logo-54985.firebaseapp.com",
  projectId: "logo-54985",
  storageBucket: "logo-54985.firebasestorage.app",
  messagingSenderId: "763002964933",
  appId: "1:763002964933:web:31b141aa1d96fbc66bd9ac",
  measurementId: "G-XY25PC2RPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize the auth service

// Initialize authentication providers
const googleProvider = new GoogleAuthProvider(); // Google provider
const facebookProvider = new FacebookAuthProvider(); // Facebook provider
 // Apple provider

// Export the auth object and providers for use in other files
export { auth, googleProvider, facebookProvider,  }; // Exporting auth and providers

export default app; // Optionally export the app instance if needed
