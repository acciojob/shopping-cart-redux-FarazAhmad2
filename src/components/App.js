import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity 
} from '../slices/cartSlice';
import { 
  addToWishlist, 
  removeFromWishlist 
} from '../slices/wishlistSlice';
// import 'bootstrap/dist/css/bootstrap.min.css'; 

const App = () => {
  const [products, setProducts] = useState([]);
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Shopping Cart</a>
          <div className="text-center">
            <h1>All Products</h1>
          </div>
        </div>
      </nav>

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4 custom-card">
            <div className="card h-100">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                <div className="d-flex justify-content-between">
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => handleAddToWishlist(product)}>
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="my-4">
        <h2>Wishlist</h2>
        {wishlist.map((item) => (
          <div key={item.id} className="card mb-3 custom-card">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={item.image} className="card-img" alt={item.title} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">${item.price}</p>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleRemoveFromWishlist(item.id)}>
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="my-4">
        <h2>Cart ({cart.length} items)</h2>
        {cart.map((item) => (
          <div key={item.id} className="card mb-3 custom-card">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={item.image} className="card-img" alt={item.title} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Price: ${item.price}</p>
                  <p className="card-text">Quantity: {item.quantity}</p>
                  <div className="d-flex justify-content-between">
                    <div>
                      <button 
                        className="btn btn-outline-success me-2"
                        onClick={() => handleIncreaseQuantity(item.id)}>
                        +
                      </button>
                      <button 
                        className="btn btn-outline-warning"
                        onClick={() => handleDecreaseQuantity(item.id)}>
                        -
                      </button>
                    </div>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromCart(item.id)}>
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="my-4 p-3 border rounded">
        <h4 className="mb-3">Checkout</h4>
        <div className="d-flex justify-content-between">
          <span>Temporary Amount</span>
          <span>${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="d-flex justify-content-between">
          <strong>Total (including VAT)</strong>
          <strong>${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</strong>
        </div>
        <button className="btn btn-success mt-3 w-100">Go to Checkout</button>
      </div>
    </div>
  );
};

export default App;
