import { useState } from "react";

type RatingStarProps = {
  ratingScore: number;
  reviewCount: number;
};

function Rating({ ratingScore, reviewCount }: RatingStarProps) {
  const [ratingMax] = useState(5.0);

  return (
    <>
      {[...new Array(ratingMax)].map((arr, index) => {
        const showEmptyIcon = ratingScore === -1 || ratingScore < index + 1;

        const isActiveRating = ratingScore !== 1;
        const isRatingWithPrecision = ratingScore % 1 !== 0;
        const isRatingEqualToIndex = Math.ceil(ratingScore) === index + 1;
        const showRatingWithPrecision =
          isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

        return (
          <div key={index} className="relative cursor-pointer">
            <div
              style={{
                width: showRatingWithPrecision
                  ? `${(ratingScore % 1) * 100}%`
                  : "0%",
                overflow: "hidden",
                position: "absolute",
              }}
            >
              <StarIcon />
            </div>
            <div>{showEmptyIcon ? <StarIconOutlined /> : <StarIcon />}</div>
          </div>
        );
      })}
      <span className="text-[#007185] ml-1 mt-[0.125rem]">
        {reviewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </span>
    </>
  );
}

const StarIcon = () => {
  return (
    <div className="material-symbols-rounded size-24 filled text-yellow-400">
      star
    </div>
  );
};

const StarIconOutlined = () => {
  return (
    <div className="material-symbols-rounded size-24 text-yellow-400">star</div>
  );
};

export default Rating;
