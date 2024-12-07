import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth, useCart } from "./authcon"; // Assurez-vous d'utiliser uniquement ce dont vous avez besoin
import "../App.css";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Liste complète des produits
  const [categories, setCategories] = useState([]); // Liste des catégories uniques
  const [selectedCategory, setSelectedCategory] = useState("all"); // Catégorie sélectionnée
  const [viewMode, setViewMode] = useState("grid"); // Etat pour suivre la vue (grille ou liste)
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { role } = useAuth(); // Utiliser uniquement "role" de useAuth

  // Fonction pour supprimer un produit
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);

      // Extraire les catégories uniques à partir des produits
      const uniqueCategories = [
        ...new Set(productList.map((product) => product.categorie)),
      ];
      setCategories(["all", ...uniqueCategories]); // Ajouter "all" comme option de filtrage
    };

    fetchProducts();
  }, []); // Ce useEffect ne doit se déclencher qu'une seule fois lors du montage du composant

  // Filtrer les produits selon la catégorie sélectionnée
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.categorie === selectedCategory);

  return (
    <div className="product-list-container">
      <h2>Liste des Produits</h2>

      {/* Barre de filtrage par catégorie */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="categoryFilter">Filtrer par catégorie : </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Toutes</option>
          {categories.map((categorie) => (
            <option key={categorie} value={categorie}>
              {categorie}
            </option>
          ))}
        </select>
      </div>

      {/* Boutons pour changer l'affichage */}
      <div className="view-mode-toggle" style={{ marginBottom: "20px" }}>
        <button onClick={() => setViewMode("grid")}>Grille</button>
        <button onClick={() => setViewMode("list")}>Liste</button>
      </div>

      <div
        className={`product-list ${viewMode === "grid" ? "grid-view" : "list-view"}`}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Prix : {product.price}DT</p>
              <p>Catégorie : {product.categorie}</p>
              <img
                src={product.imageURL}
                alt={product.name}
                style={{ width: "200px", marginBottom: "10px" }}
              />

              {/* Afficher le bouton Ajouter au panier pour les utilisateurs */}
              {role === "user" && (
                <button
                  variant="primary"
                  onClick={() => addToCart(product)} // Assurez-vous d'avoir une fonction addToCart dans votre contexte ou ailleurs
                >
                  Ajouter au panier
                </button>
              )}

              {/* Afficher les boutons Modifier et Supprimer pour les admins */}
              {role === "admin" && (
                <div>
                  <button
                    onClick={() => navigate(`/edit-product/${product.id}`)}
                    style={{ marginRight: "10px" }}
                  >
                    Modifier
                  </button>
                  <button onClick={() => handleDelete(product.id)}>Supprimer</button>
                </div>
              )}

              {/* Afficher un bouton "Ajouter un produit" pour l'admin */}
              {role === "admin" && (
                <div>
                  <button
                    onClick={() => navigate("/add-product")}
                    style={{ marginTop: "10px" }}
                  >
                    Ajouter un produit
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Aucun produit trouvé pour cette catégorie.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
