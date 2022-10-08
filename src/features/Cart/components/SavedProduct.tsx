import { useState } from "react";
import { ICart } from "../cartSlice";
import "../../../styles/SaveProduct.styles.css";

type SaveProductProps = {
  product: ICart;
  moveItemToCart: (product: ICart) => void;
  savedItemRemove: (product: ICart) => void;
};

function SavedProduct(props: SaveProductProps) {
  const { thumbnail, title, price, sale_price, rating, reviews } =
    props.product;
  const [formattedPrice] = useState(
    sale_price ? sale_price?.toFixed(2).toString() : price.toFixed(2).toString()
  );

  const moveToCartHandler = () => {
    props.moveItemToCart(props.product);
  };

  const deleteSavedItemHandler = () => {
    props.savedItemRemove(props.product);
  };

  return (
    <div className="saved_product">
      <div className="image-overlay-grey">
        <img
          src={thumbnail}
          alt={title}
          className="object-contain max-w-full max-h-full"
        />
      </div>

      <div className="saved_product_info">
        <h1 className="saved_product_name">{title}</h1>

        <p className="saved_product_price">$ {formattedPrice}</p>

        <button onClick={moveToCartHandler} className="py-1 w-full">
          Move to basket
        </button>

        <div className="my-4 flex flex-col justify-start w-full">
          <button
            onClick={deleteSavedItemHandler}
            className="border-none px-3 max-w-fit text-[#007185] hover:text-[#C7511F]"
          >
            Delete
          </button>
          <button className="border-none px-3 max-w-fit text-[#007185] hover:text-[#C7511F]">
            Add to list
          </button>
        </div>
      </div>
    </div>
  );
}

export default SavedProduct;
