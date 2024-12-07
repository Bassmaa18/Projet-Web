import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

const EditProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchProduct = async () => {
      const productDoc = doc(db, "products", id);
      const productSnapshot = await getDoc(productDoc);
      if (productSnapshot.exists()) {
        const productData = productSnapshot.data();
        setName(productData.name);
        setDescription(productData.description);
        setPrice(productData.price);
        setCategory(productData.category);
        setImage(productData.imageURL);
      } else {
        navigate("/"); 
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      if (!image) {
        setError("Veuillez ajouter une image !");
        return;
      }

      
      const productDoc = doc(db, "products", id);
      await updateDoc(productDoc, {
        name,
        description,
        price: parseFloat(price),
        category,
        imageURL: image,
      });

      setError("");
      alert("Produit mis à jour avec succès !");
      navigate("/"); 
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit :", error);
      setError("Une erreur s'est produite !");
    }
  };

  return (
    <div>
      <h2>Modifier le produit</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleEditProduct}>
        <input
          type="text"
          placeholder="Nom du produit"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Mettre à jour le produit</button>
      </form>
    </div>
  );
};

export default EditProduct;
