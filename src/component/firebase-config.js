import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Ajout de collection et getDocs
import { getStorage } from "firebase/storage";

// Configuration de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD_F2XP1SzR4ASt8wa6LneJ62-64T8kvGg",
  authDomain: "marketplace-691d1.firebaseapp.com",
  projectId: "marketplace-691d1",
  storageBucket: "marketplace-691d1.firebasestorage.app",
  messagingSenderId: "901192080457",
  appId: "1:901192080457:web:6056ed97c03c8e17e33398",
  measurementId: "G-GWCG2TJEBN"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation des services Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Exportation de la configuration et des méthodes supplémentaires
export { collection, getDocs };

// Vous pouvez soit choisir d'exporter `app` par défaut, soit de l'exporter explicitement avec `export { app };`
// Si vous souhaitez garder l'export par défaut pour `app`, gardez-le tel quel, mais il est redondant ici.
export default app;
