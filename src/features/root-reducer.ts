import { combineReducers } from "@reduxjs/toolkit";

import shopping_cart from "./Cart/cartSlice";

export default combineReducers({
  shopping_cart: shopping_cart,
});
