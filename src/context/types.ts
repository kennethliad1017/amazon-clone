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

export interface ICart {
  id: string;
  product: IProduct;
  quantity: number;
}

export type CartContextType = {
  cartItems: ICart[];
  subTotal: number;
  addProductToCart: (productToAdd: IProduct) => void;
  removeProductFromCart: (productToRemove: IProduct) => void;
  clearProductFromCart: (id: string) => void;
  clearProductsFromCart: () => void;
};
