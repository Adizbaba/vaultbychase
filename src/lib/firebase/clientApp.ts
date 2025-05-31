
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage"; // Added FirebaseStorage import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdRR8yU_DjpnhNK5kyKUOK-4SB1DH-mQs",
  authDomain: "weighty-elf-461314-q0.firebaseapp.com",
  projectId: "weighty-elf-461314-q0",
  storageBucket: "weighty-elf-461314-q0.appspot.com", // Corrected from .firebasestorage.app to .appspot.com as per standard
  messagingSenderId: "846417326897",
  appId: "1:846417326897:web:25fc8cc1a6a3e4404d7610",
  measurementId: "G-R8V5XWGQHN"
};

let app: FirebaseApp;
let auth: Auth;
let storage: FirebaseStorage; // Added storage variable

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}
auth = getAuth(app);
storage = getStorage(app); // Initialize Firebase Storage

export { app, auth, storage }; // Export storage
