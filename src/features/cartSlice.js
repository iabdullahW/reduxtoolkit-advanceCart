// src/features/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid'; // Import nanoid

const initialState = {
  cartItems: [], // Array to hold cart items
  totalQuantity: 0, // Total items in cart
  totalPrice: 0,    // Total price of cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += existingItem.price;
      } else {
        state.cartItems.push({
          ...action.payload,
          id: nanoid(),
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },
    removeItem: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += existingItem.price;
        state.totalQuantity += 1;
        state.totalPrice += existingItem.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.totalPrice -= existingItem.price;
        state.totalQuantity -= 1;
        state.totalPrice -= existingItem.price;
      }
    }
  }
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
