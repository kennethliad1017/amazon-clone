import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  addCartItem,
  clearCartItem,
  moveCartItem,
  removeCartItem,
} from "../../utils/cart.utils";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  sale_price?: number;
  rating: number;
  reviews: number;
  thumbnail: string;
}

export interface ICart extends IProduct {
  quantity: number;
}

export interface CartState {
  cart: ICart[];
  savedProduct: ICart[];
}

const initialState: CartState = {
  cart: [],
  savedProduct: [],
};

export const cartSlice = createSlice({
  name: "shopping_cart",
  initialState,
  reducers: {
    addProductToCart: (state, { payload }: PayloadAction<IProduct>) => {
      state.cart = addCartItem(state.cart, payload);
    },

    removeProductFromCart: (state, { payload }: PayloadAction<IProduct>) => {
      state.cart = removeCartItem(state.cart, payload);
    },

    clearProductFromCart: (state, { payload }: PayloadAction<IProduct>) => {
      state.cart = clearCartItem(state.cart, payload.id);
    },

    emptyTheCart: (state) => {
      state.cart = [];
    },

    // payload is an existing product that has been added to cart
    saveForLater: (state, { payload }: PayloadAction<ICart>) => {
      state.cart = clearCartItem(state.cart, payload.id);
      state.savedProduct = [...state.savedProduct, payload];
    },

    moveToCart: (state, { payload }: PayloadAction<ICart>) => {
      state.cart = moveCartItem(state.cart, payload);
      state.savedProduct = state.savedProduct.filter(
        (product) => product.id !== payload.id
      );
    },

    removeSavedItem: (state, { payload }: PayloadAction<ICart>) => {
      state.savedProduct = clearCartItem(state.savedProduct, payload.id);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addProductToCart,
  removeProductFromCart,
  clearProductFromCart,
  emptyTheCart,
  saveForLater,
  moveToCart,
  removeSavedItem,
} = cartSlice.actions;

export default cartSlice.reducer;
