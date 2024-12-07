import React, { useState, useEffect } from 'react';
import { db, collection, getDocs } from './firebase-config';
import {  Button } from 'react-bootstrap';
import "../App.css";


const fetchRandomProducts = async () => {
  const productsCollection = collection(db, "Products"); 
  const productsSnapshot = await getDocs(productsCollection);
  const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  // Mélanger les produits de manière aléatoire et en sélectionner 3
  const randomProducts = productsList.sort(() => 0.5 - Math.random()).slice(0, 3);
  
  return randomProducts;
};

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Appel de la fonction pour récupérer les produits aléatoires
    const getRandomProducts = async () => {
      const randomProducts = await fetchRandomProducts();
      setProducts(randomProducts);
    };

    getRandomProducts();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-header">Bienvenue dans My market</h1>
      <p className="home-subtitle">Découvrez nos produits populaires</p>
      
      <div className="home-intro">
        <h2>Nos produits populaires</h2>
        <div className="home-products">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="home-product-card">
                <img className="home-product-img" src={product.ProductImg} alt={product.ProductName} />
                <div className="home-product-details">
                  <h3 className="home-product-name">{product.ProductName}</h3>
                  <p className="home-product-price">{product.ProductPrice} TND</p>
                  <Button className="home-add-to-cart-btn">Ajouter au panier</Button>
                </div>
              </div>
            ))
          ) : (
            <p>Chargement des produits...</p>
          )}
        </div>
      </div>

      <div className="home-testimonials">
        <h3>Témoignages</h3>
        <p>"J'adore cette marketplace, c'est facile à utiliser et j'y trouve tout ce dont j'ai besoin !" - Client satisfait</p>
      </div>
    </div>
  );
};

export default Home;
