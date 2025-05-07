import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzkjPKNHfLBEolEM0zCDTYH7t3BSdbJL8",
  authDomain: "skill-swapper-f9d30.firebaseapp.com",
  projectId: "skill-swapper-f9d30",
  storageBucket: "skill-swapper-f9d30.appspot.com",
  messagingSenderId: "223056133095",
  appId: "1:223056133095:web:2d9d274e952f5e0c621b42",
  measurementId: "G-LHJRQWQXKR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
