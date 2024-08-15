import React from "react";
import Navbar from "./Navbar";
import Cart from "./Cart"
import Products from "./Products";
import Wishlist from "./Wishlist";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Navbar/>
      <div className="container">
        <Products />
        <Wishlist />
        <Cart />
      </div>
      <Footer />
    </>
  );
}

export default App;