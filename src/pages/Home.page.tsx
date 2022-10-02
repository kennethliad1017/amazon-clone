import { ProductCard } from "../components";
import Hero from "../features/Home/components/Hero.component";
import "../styles/home.styles.css";
import dummyData from "../product-dummydata.json";
import { ProductsGrid } from "../features";
import { useContext } from "react";
import { CartContext } from "../context/Cart.context";
import { CartContextType, IProduct } from "../context/types";

function Home() {
  const { addProductToCart } = useContext<CartContextType>(CartContext);
  const products = dummyData.products;

  const productAddToCart = (product: IProduct) => {
    addProductToCart(product);
  };

  return (
    <div className="home">
      <div className="home__container">
        <Hero />
        <ProductsGrid>
          {products.map((arr, index) => {
            return (
              <ProductCard
                key={index}
                {...arr}
                onClickHandler={productAddToCart}
              />
            );
          })}
        </ProductsGrid>
        {/* <div className="home__products">
          <ProductCard
            title={products[0].title}
            ratingScore={products[0].rating}
            reviewCount={products[0].reviews}
            price={products[0].price}
            imageUrl={products[0].thumbnail}
          />
          <ProductCard
            title={products[1].title}
            ratingScore={products[1].rating}
            reviewCount={products[1].reviews}
            price={products[1].price}
            salesPrice={products[1].sale_price}
            imageUrl={products[1].thumbnail}
          />
          <ProductCard
            title={products[2].title}
            ratingScore={products[2].rating}
            reviewCount={products[2].reviews}
            price={products[2].price}
            imageUrl={products[2].thumbnail}
          />
        </div>

        <div className="home__products">
          <ProductCard
            title={products[3].title}
            ratingScore={products[3].rating}
            reviewCount={products[3].reviews}
            price={products[3].price}
            imageUrl={products[3].thumbnail}
          />
          <ProductCard
            title={products[4].title}
            ratingScore={products[4].rating}
            reviewCount={products[4].reviews}
            price={products[4].price}
            imageUrl={products[4].thumbnail}
          />
        </div>

        <div className="home__products">
          <ProductCard
            title={products[5].title}
            ratingScore={products[5].rating}
            reviewCount={products[5].reviews}
            price={products[5].price}
            imageUrl={products[5].thumbnail}
          />
          <ProductCard
            title={products[6].title}
            ratingScore={products[6].rating}
            reviewCount={products[6].reviews}
            price={products[6].price}
            imageUrl={products[6].thumbnail}
          />
          <ProductCard
            title={products[7].title}
            ratingScore={products[7].rating}
            reviewCount={products[7].reviews}
            price={products[7].price}
            imageUrl={products[7].thumbnail}
          />
        </div> */}
      </div>
    </div>
  );
}

export default Home;
