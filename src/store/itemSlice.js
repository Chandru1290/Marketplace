import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('products')) || [],
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('products', JSON.stringify(state.items));
    },
    editItem: (state, action) => {
      const { index, updatedItem } = action.payload;
      state.items[index] = updatedItem;
      localStorage.setItem('products', JSON.stringify(state.items));
    },
    deleteItem: (state, action) => {
      state.items.splice(action.payload, 1);
      localStorage.setItem('products', JSON.stringify(state.items));
    },
  },
});

export const { addItem, editItem, deleteItem } = itemSlice.actions;
export default itemSlice.reducer;
