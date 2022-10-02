import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { CartContextType } from "../../context/types";
import "./navbar.styles.css";

const Navbar = () => {
  const { cartItems } = useContext<CartContextType>(CartContext);

  return (
    <div className="header">
      <img
        className="header__logo"
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
      />
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <button className="header__searchIcon material-symbols-rounded size-24">
          search
        </button>
      </div>

      <div className="header__navItems">
        <a href="#signin" className="header__navLink">
          <span className="header__subtitle">Hello, sign in</span>
          <span className="header__label">
            Account &amp; Lists
            <i className="material-symbols-rounded size-20 filled text-gray-400 leading-[15px!important]">
              arrow_drop_down
            </i>
          </span>
        </a>
        <div className="header__navLink">
          <span className="header__subtitle">Returns</span>
          <span className="header__label">&amp; Orders</span>
        </div>

        <div className="header__cart">
          <span className="material-symbols-rounded size-24 filled">
            shopping_basket
          </span>
          <span className="header__label header__cartCount">
            {cartItems.length ? cartItems.length : 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
