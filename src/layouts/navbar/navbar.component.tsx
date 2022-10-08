import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import "./navbar.styles.css";

const Navbar = () => {
  const [{ cart }] = useCart();

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon"
        />
      </Link>
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
          <Link to="/cart" className="h-full flex items-center">
            <span className="material-symbols-rounded size-24 filled">
              shopping_basket
            </span>
            <span className="header__label header__cartCount">
              {cart.length ? cart.length : 0}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
