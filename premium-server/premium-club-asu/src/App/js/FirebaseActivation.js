import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const FirebaseActivation = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCgpK554GxIBQNt1NSOjZ4MM7-a_kTkzqc",
        authDomain: "premium-club-asu.firebaseapp.com",
        databaseURL: "https://premium-club-asu.onrender.com",
        projectId: "premium-club-asu",
        storageBucket: "premium-club-asu.appspot.com",
        messagingSenderId: "671175602873",
        appId: "1:671175602873:web:8be5d405e2a9891369a168",
        measurementId: "G-4K0Z3N3EET"
      };
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      logEvent(analytics, 'notification_received');
      //ANALYTICS ONLOAD
      window.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);console.log('1')}
        gtag('js', new Date());
        gtag('config', 'G-4K0Z3N3EET');

        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-4K0Z3N3EET';
        script.async = true;
        document.head.appendChild(script);
    }
}

export default FirebaseActivation;