import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { CartState } from "../features/Cart/cartSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

function useCart(): [
  CartState,
  ThunkDispatch<{ shopping_cart: CartState }, undefined, AnyAction> &
    Dispatch<AnyAction>
] {
  const cart = useAppSelector((state) => state.shopping_cart);
  const dispatchCart = useAppDispatch();

  return [cart, dispatchCart];
}

export default useCart;
