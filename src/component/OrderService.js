import { db } from "./firebase-config";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";

// Référence à la collection "orders"
const ordersCollectionRef = collection(db, "orders");

// Ajouter une nouvelle commande
export const addOrder = async (userId, productIds) => {
  await addDoc(ordersCollectionRef, {
    userId,
    productIds,
    status: "en attente",
    orderDate: new Date().toISOString(),
  });
};

// Récupérer toutes les commandes
export const getOrders = async () => {
  const ordersSnapshot = await getDocs(ordersCollectionRef);
  return ordersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Mettre à jour le statut d'une commande
export const updateOrderStatus = async (id, status) => {
  const orderDoc = doc(db, "orders", id);
  await updateDoc(orderDoc, { status });
};
