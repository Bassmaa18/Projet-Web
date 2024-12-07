import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // Pour afficher le message après paiement
  const navigate = useNavigate();

  const handlePayment = () => {
    if (name && address && phone) {
      // Vérifier si tous les champs sont remplis
      setIsSubmitted(true);
      setTimeout(() => {
        navigate("/"); // Redirection vers l'accueil après 2 secondes
      }, 2000); // Délai avant la redirection
    } else {
      alert("Veuillez remplir tous les champs avant de procéder au paiement.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Page de Paiement</h2>
      {!isSubmitted ? (
        <>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>Nom :</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="address" style={{ display: "block", marginBottom: "5px" }}>Adresse :</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="phone" style={{ display: "block", marginBottom: "5px" }}>Téléphone :</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
          <button
            onClick={handlePayment}
            style={{ backgroundColor: "#28a745", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Payer
          </button>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h3>Votre paiement est confirmé pour la livraison.</h3>
          <p>Vous serez redirigé vers l'accueil dans quelques secondes...</p>
        </div>
      )}
    </div>
  );
};

export default Payment;
