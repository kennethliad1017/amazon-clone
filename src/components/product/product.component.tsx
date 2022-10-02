import { useState } from "react";
import { IProduct } from "../../context/types";
import Rating from "../rating/rating.component";
import "./product.styles.css";

type ProductProps = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  reviews: number;
  price: number;
  sale_price?: number;
  onClickHandler: (product: IProduct) => void;
};

function ProductCard({
  id,
  title,
  description,
  thumbnail,
  rating,
  reviews,
  price,
  sale_price,
  onClickHandler,
}: ProductProps) {
  const [formattedPrice] = useState(
    sale_price
      ? sale_price?.toFixed(2).toString().split(".")
      : price.toFixed(2).toString().split(".")
  );

  const clickHandler = () => {
    const productToAdd: IProduct = {
      id,
      title,
      description,
      thumbnail,
      rating,
      reviews,
      price,
      sale_price,
    };
    onClickHandler(productToAdd);
  };

  return (
    <div className="product">
      <div className="product__info">
        <h2>{title}</h2>
        {/* {store && <span className="secondary__label">by {store}</span>} */}
        <div className="flex items-end">
          <p className="product__price">
            <sup>$</sup>
            <span>{formattedPrice[0]}</span>
            <sup>{formattedPrice[1]}</sup>
          </p>
          {sale_price && <p className="product__sales">${price.toFixed(2)}</p>}
        </div>
        <div className="product__rating">
          <Rating ratingScore={rating} reviewCount={reviews} />
        </div>
      </div>

      <img src={thumbnail} />

      <button onClick={clickHandler}>Add to Basket</button>
    </div>
  );
}

export default ProductCard;
