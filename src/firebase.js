import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBolipn-D_C9V9rtF7n2FSPgGH2Y0aUHwA",
	authDomain: "ocity-stade.firebaseapp.com",
	projectId: "ocity-stade",
	storageBucket: "ocity-stade.appspot.com",
	messagingSenderId: "964826299775",
	appId: "1:964826299775:web:ea246aa33db34d051fee4a",
	measurementId: "G-0TQTLS3MQE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
