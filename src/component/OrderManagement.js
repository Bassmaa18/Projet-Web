import React, { useState, useEffect } from "react";
import { getOrders, updateOrderStatus } from "./OrderService";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);
      } catch (err) {
        setError("Erreur de chargement des commandes.");
      }
    };
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    await updateOrderStatus(id, newStatus);
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div>
      <h2>Gestion des Commandes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Commande ID: {order.id}</p>
            <p>Status: {order.status}</p>
            <button
              onClick={() => handleUpdateStatus(order.id, "en livraison")}
            >
              Mettre en livraison
            </button>
            <button
              onClick={() => handleUpdateStatus(order.id, "livré")}
            >
              Marquer comme livré
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderManagement;
