// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';
import wishlistReducer from '../slices/wishlistSlice';
import discountReducer from '../slices/discountSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    discount: discountReducer,
  },
});

export default store;
