import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity 
} from '../slices/cartSlice'; // Import actions from the cart slice
import { 
  addToWishlist, 
  removeFromWishlist 
} from '../slices/wishlistSlice'; // Import actions from the wishlist slice

import '../styles/App.css'

const App = () => {
  const [products, setProducts] = useState([]);
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the products from the API
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
    <div className="App">
      <h1>All Products</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.price} USD</p>
            <div className='btns'>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <button onClick={() => handleAddToWishlist(product)}>Add to Wishlist</button></div>
          </div>
        ))}
      </div>

      <div className="wishlist">
        <h2>Wishlist</h2>
        {wishlist.map((item) => (
          <div key={item.id} className="wishlist-item">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.price} USD</p>
            <button onClick={() => handleRemoveFromWishlist(item.id)}>Remove from Wishlist</button>
          </div>
        ))}
      </div>


      <div className='cart-container'>
      <div className="cart">
        <h2>Cart ({cart.length} items)</h2>
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>Price: {item.price} USD</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
            <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
          </div>
        ))}
      </div>
      <div className='checkout'>
        <p>The total amount of</p>
        <div><p>Temporary Amount</p><p>{cart.reduce((sum,item)=>sum+(item.price*item.quantity),0)}</p></div>
        <div><p>Shipping</p><p>Free</p></div>
        <div className='total'><p>The total amount (including Vat)</p><p>{cart.reduce((sum,item)=>sum+(item.price*item.quantity),0)}</p></div>
      <button>Go to checkout</button>
      </div>
      </div>  
      
    </div>
  );
};

export default App;
