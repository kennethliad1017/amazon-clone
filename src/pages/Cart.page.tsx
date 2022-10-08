import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Kettle from "../assets/images/kettle-desaturated._CB445243794_.svg";
import { IconButton } from "../components";
import {
  addProductToCart,
  clearProductFromCart,
  ICart,
  IProduct,
  moveToCart,
  removeProductFromCart,
  removeSavedItem,
  saveForLater,
} from "../features/Cart/cartSlice";
import Tab from "../features/Cart/components/Tab";
import useCart from "../hooks/useCart";
import "../styles/Cart.styles.css";
import { SavedProduct } from "../features";

function Cart() {
  const [savedLabel, setSavedLabel] = useState("No items saved for later");
  const [activeTab, setActiveTab] = useState(savedLabel);
  const [subTotal, setSubtotal] = useState(0);

  const [{ cart, savedProduct }, setCart] = useCart();

  const removeItemFromCart = (product: IProduct) => {
    setCart(removeProductFromCart(product));
  };

  const addItemToCart = (product: IProduct) => {
    setCart(addProductToCart(product));
  };

  const deleteProductFromCart = (product: IProduct) => {
    setCart(clearProductFromCart(product));
  };

  const saveProductLater = (cartItem: ICart) => {
    setCart(saveForLater(cartItem));
  };

  const moveItemToCart = (product: ICart) => {
    setCart(moveToCart(product));
  };

  const deleteSavedItem = (product: ICart) => {
    setCart(removeSavedItem(product));
  };

  const selectTab = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    const newCartTotal = cart.reduce(
      (total, cartItem) =>
        cartItem.sale_price
          ? total + cartItem.quantity * cartItem.sale_price
          : total + cartItem.quantity * cartItem.price,
      0
    );

    setSubtotal(newCartTotal);
  }, [cart]);

  useEffect(() => {
    if (activeTab !== "Buy it again") {
      if (savedProduct.length > 0) {
        setSavedLabel(
          `Saved for later (${savedProduct.length} ${
            savedProduct.length > 1 ? "items" : "item"
          })`
        );
        setActiveTab(
          `Saved for later (${savedProduct.length} ${
            savedProduct.length > 1 ? "items" : "item"
          })`
        );
      } else {
        setSavedLabel("No items saved for later");
        setActiveTab("No items saved for later");
      }
    }
  }, [savedProduct, activeTab]);

  return (
    <div className="flex px-4 py-3 min-w-[998px] mx-auto ">
      <div className="cart">
        <div className="shopping_cart">
          <div className="cart-content">
            {cart.length > 0 ? (
              <div className="flex flex-col px-5 text-2xl">
                <h1>Shopping Cart</h1>

                <span className="text-[10px] leading-3 text-gray-500/80 ml-auto uppercase">
                  Price
                </span>
                <hr />
                <div className="my-2">
                  {cart.map((item, index) => {
                    return (
                      <div key={index} className="text-sm my-3">
                        <div className="cart_item">
                          <div className="cart_product">
                            <img
                              src={item.thumbnail}
                              alt="Products thumbnail"
                            />
                            <div className="cart_info">
                              <h1 className="text-base">{item.title}</h1>
                              <div className="cart_itemAction">
                                <div className="flex items-center px-2">
                                  <IconButton
                                    tagName="button"
                                    iconstyle="rounded"
                                    iconSize="24"
                                    icon="remove"
                                    onClick={() => removeItemFromCart(item)}
                                  />
                                  <span className="cart_quantity">
                                    {item.quantity}
                                  </span>
                                  <IconButton
                                    tagName="button"
                                    iconstyle="rounded"
                                    iconSize="24"
                                    icon="add"
                                    onClick={() => addItemToCart(item)}
                                  />
                                </div>

                                <div className="divider divider-horizontal" />

                                <button
                                  onClick={() => deleteProductFromCart(item)}
                                  className="border-none px-3 text-[#007185] hover:text-[#C7511F]"
                                >
                                  Delete
                                </button>

                                <div className="divider divider-horizontal" />

                                <button
                                  onClick={() => saveProductLater(item)}
                                  className="border-none px-3 text-[#007185] hover:text-[#C7511F]"
                                >
                                  Save for later
                                </button>
                              </div>
                            </div>
                          </div>
                          <span>
                            <strong>
                              ${item.sale_price ? item.sale_price : item.price}
                            </strong>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <hr />
                <span className="text-sm mt-1 leading-3 ml-auto">
                  Subtotal ({cart.length} {cart.length === 1 ? "item" : "items"}
                  ): <strong>${subTotal.toFixed(2)}</strong>
                </span>
              </div>
            ) : (
              <div className="mt-8 w-full cartui">
                <div className="cart_emptyImg">
                  <img src={Kettle} alt="Kettle" />
                </div>
                <div>
                  <h1 className="text-2xl">Your Amazon Cart is empty</h1>
                  <br />
                  <div className="auth_link">
                    <Link to="#!" className="auth_signin">
                      Sign in to your account
                    </Link>
                    <Link to="#!" className="auth_signup">
                      Sign up now
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="saved_cart">
          <h1 className="title">Your Items</h1>
          <ul className="cart_tabs">
            <Tab activeTab={activeTab} label={savedLabel} onClick={selectTab} />
            <Tab
              activeTab={activeTab}
              label="Buy it again"
              onClick={selectTab}
            />
          </ul>

          <div className="w-full">
            <div className="grid grid-cols-3 lg:gap-8 md:gap-12">
              {savedProduct.map((product) => {
                return (
                  <SavedProduct
                    key={product.id}
                    product={product}
                    moveItemToCart={moveItemToCart}
                    savedItemRemove={deleteSavedItem}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="cart_subtotal">
        <div className="flex items-center py-2 mb-4">
          <span className="material-symbols-rounded size-20 filled text-green-500 mr-1">
            check_circle
          </span>
          <p className="text-green-500">
            Your order is eligible for FREE Delivery.
          </p>
        </div>
        <h1>
          Subtotal ({cart.length} {cart.length === 1 ? "item" : "items"}): $
          {subTotal.toFixed(2)}
        </h1>
        <button>Proceed to Buy</button>
      </div>
    </div>
  );
}

export default Cart;
