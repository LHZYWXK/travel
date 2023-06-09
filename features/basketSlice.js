import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "counter",
  initialState: {
    items: [],
  },
  reducers: {
    addToBasket: (state, action) => {
      if (state.items.find((item) => item.id === action.payload.id)) {
        return { ...state };
      } else {
        state.items = [...state.items, action.payload];
      }
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          "Can't remove attraction (id: ${action.payload.id}) as it's not in basket!"
        );
      }

      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;
export const selectBasketItemWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);
export default basketSlice.reducer;
