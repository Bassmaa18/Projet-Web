import { db } from "./firebase-config";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

// Référence à la collection "categories"
const categoriesCollectionRef = collection(db, "categories");

// Ajouter une catégorie
export const addCategory = async (categoryName) => {
  await addDoc(categoriesCollectionRef, { name: categoryName });
};

// Récupérer toutes les catégories
export const getCategories = async () => {
  const data = await getDocs(categoriesCollectionRef);
  return data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Modifier une catégorie
export const updateCategory = async (id, newName) => {
  const categoryDoc = doc(db, "categories", id);
  await updateDoc(categoryDoc, { name: newName });
};

// Supprimer une catégorie
export const deleteCategory = async (id) => {
  const categoryDoc = doc(db, "categories", id);
  await deleteDoc(categoryDoc);
};
