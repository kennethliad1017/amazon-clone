import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { CartContextType, ICart, IProduct } from "./types";

const addCartItem = (cartItems: ICart[], productToAdd: IProduct) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.product.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.product.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { id: uuidv4(), product: productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: ICart[], cartItemToRemove: IProduct) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.product.id === cartItemToRemove.id
  );

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.product.id !== cartItemToRemove.id
    );
  }

  return cartItems.map((cartItem) =>
    cartItem.product.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const clearCartItem = (cartItems: ICart[], id: string): ICart[] =>
  cartItems.filter((cartItem) => cartItem.id !== id);

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  subTotal: 0,
  addProductToCart: (productToAdd: IProduct) => {},
  removeProductFromCart: (productToRemove: IProduct) => {},
  clearProductFromCart: (id: string) => {},
  clearProductsFromCart: () => {},
});

// CartContext Provider
const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<ICart[]>([]);
  const [subTotal, setSubTotal] = useState(0);

  const addProductToCart = (productToAdd: IProduct) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeProductFromCart = (productToRemove: IProduct) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearProductsFromCart = () => {
    setCartItems([]);
  };

  const clearProductFromCart = (id: string) => {
    setCartItems(clearCartItem(cartItems, id));
  };

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) =>
        cartItem.product.sale_price
          ? total + cartItem.quantity * cartItem.product.sale_price
          : total + cartItem.quantity * cartItem.product.price,
      0
    );

    setSubTotal(newCartTotal);
  }, [cartItems]);

  const value = {
    cartItems,
    subTotal,
    addProductToCart,
    removeProductFromCart,
    clearProductFromCart,
    clearProductsFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
