import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-config";

// Création du contexte d'authentification
const AuthContext = createContext();

// Fournisseur d'authentification
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Utilisateur connecté
  const [loading, setLoading] = useState(true); // Indique si les données sont encore en chargement

  // Surveille les changements de l'état d'authentification de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Utilisateur actuel dans le contexte : ", user);
      setCurrentUser(user);
      setLoading(false); // Une fois que l'état utilisateur est récupéré
    });

    // Nettoie l'abonnement au changement d'état lorsqu'on quitte le composant
    return unsubscribe;
  }, []);

  // Fonction de déconnexion
  const logout = async () => {
    try {
      await signOut(auth);
      console.log("Déconnexion réussie.");
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error);
    }
  };

  // Valeurs disponibles dans le contexte
  const value = {
    currentUser, // Utilisateur connecté
    logout, // Fonction pour déconnecter
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook pour utiliser le contexte d'authentification dans d'autres composants
export const useAuth = () => {
  return useContext(AuthContext);
};





//////////////////////////////:Panierrrr ///////////////////
// src/context/CartContext.js


// Créer un contexte pour le panier
const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Ajouter un produit au panier
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Calculer le nombre total d'articles dans le panier
  const getTotalItems = () => {
    return cart.length;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};
