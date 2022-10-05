import { useContext } from "react";
import { Link } from "react-router-dom";
import Kettle from "../assets/images/kettle-desaturated._CB445243794_.svg";
import { IconButton } from "../components";
import { CartContext } from "../context/Cart.context";
import { CartContextType, IProduct } from "../context/types";
import "../styles/Cart.styles.css";

function Cart() {
  const {
    cartItems,
    subTotal,
    removeProductFromCart,
    addProductToCart,
    clearProductFromCart,
  } = useContext<CartContextType>(CartContext);

  const removeItemFromCart = (product: IProduct) => {
    removeProductFromCart(product);
  };

  const addItemToCart = (product: IProduct) => {
    addProductToCart(product);
  };

  const deleteProductFromCart = (id: string) => {
    clearProductFromCart(id);
  };

  return (
    <div className="flex px-4 py-3 min-w-[998px] mx-auto ">
      <div className="flex-1 flex-wrap bg-white">
        <div className="cart-content">
          {cartItems.length > 0 ? (
            <div className="flex flex-col px-5 text-2xl">
              <h1>Shopping Cart</h1>

              <span className="text-[10px] leading-3 text-gray-500/80 ml-auto uppercase">
                Price
              </span>
              <hr />
              <div className="my-2">
                {cartItems.map((item, index) => {
                  return (
                    <div key={index} className="text-sm my-3">
                      <div className="cart_item">
                        <div className="cart_product">
                          <img src={item.product.thumbnail} />
                          <div className="cart_info">
                            <h1 className="text-base">{item.product.title}</h1>
                            <div className="cart_itemAction">
                              <div className="flex items-center px-2">
                                <IconButton
                                  tagName="button"
                                  iconstyle="rounded"
                                  iconSize="24"
                                  icon="remove"
                                  onClick={() =>
                                    removeItemFromCart(item.product)
                                  }
                                />
                                <span className="cart_quantity">
                                  {item.quantity}
                                </span>
                                <IconButton
                                  tagName="button"
                                  iconstyle="rounded"
                                  iconSize="24"
                                  icon="add"
                                  onClick={() => addItemToCart(item.product)}
                                />
                              </div>

                              <div
                                className="divider divider-horizontal"
                                style={{
                                  marginTop: "3px",
                                  marginBottom: "3px",
                                  height: "auto",
                                }}
                              />

                              <IconButton
                                tagName="button"
                                iconstyle="rounded"
                                iconSize="24"
                                className="text-red-500 border-none  p-2"
                                onClick={() => deleteProductFromCart(item.id)}
                              >
                                delete
                              </IconButton>

                              <div
                                className="divider divider-horizontal"
                                style={{
                                  marginTop: "3px",
                                  marginBottom: "3px",
                                  height: "auto",
                                }}
                              />

                              <IconButton
                                tagName="button"
                                iconstyle="rounded"
                                iconSize="24"
                                className="text-green-500 border-none p-2"
                              >
                                bookmark_add
                              </IconButton>
                            </div>
                          </div>
                        </div>
                        <span>
                          <strong>
                            $
                            {item.product.sale_price
                              ? item.product.sale_price
                              : item.product.price}
                          </strong>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <hr />
              <span className="text-sm mt-1 leading-3 ml-auto">
                Subtotal ({cartItems.length} item):{" "}
                <strong>${subTotal.toFixed(2)}</strong>
              </span>
            </div>
          ) : (
            <div className="mt-8 w-full cartui">
              <div className="cart_emptyImg">
                <img src={Kettle} alt="Kettle Image" />
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
          Subtotal ({cartItems.length} item): ${subTotal.toFixed(2)}
        </h1>
        <button>Proceed to Buy</button>
      </div>
    </div>
  );
}

export default Cart;
