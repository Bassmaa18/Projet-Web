import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "./component/navbar";
import Home from "./component/home";
import { Signup } from "./component/sign";
import { Login } from "./component/log";
import ProductList from "./component/productList";
import AddProduct from "./component/addProducts";
import EditProduct from "./component/EditProduct";
import CategoryManagement from "./component/CategoryManagement";
import OrderManagement from "./component/OrderManagement";
import UserManagement from "./component/UserManagement";
import Payment from "./component/Payment";
import { useAuth } from "./component/authcon";

const App = () => {
  const { currentUser } = useAuth(); // Récupère l'utilisateur authentifié

  return (
    <>
      {currentUser && <NavigationBar />}
      <Routes>
        {!currentUser ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/manage-categories" element={<CategoryManagement />} />
            <Route path="/manage-orders" element={<OrderManagement />} />
            <Route path="/manage-users" element={<UserManagement />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
