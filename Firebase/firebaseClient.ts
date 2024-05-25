import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyA-ynj0Xx2bHzFu_xQ3h8emoy3Zy4AdFFQ",
  authDomain: "realtor-web-app.firebaseapp.com",
  projectId: "realtor-web-app",
  storageBucket: "realtor-web-app.appspot.com",
  messagingSenderId: "1034240181547",
  appId: "1:1034240181547:web:c276fb44823264a137316e",
  measurementId: "G-NW4KHB8W4F",
};

// Initialize Firebase
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
if (typeof window !== "undefined") {
  (async () => {
    if (await isSupported()) {
      const analytics = getAnalytics(app);
      logEvent(analytics, "notification_received");
    } else {
      console.warn("Firebase Analytics is not supported in this environment.");
    }
  })();
}
export const auth = getAuth(app);
