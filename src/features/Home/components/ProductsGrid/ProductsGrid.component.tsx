import React, { PropsWithChildren } from "react";

function ProductsGrid({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {children}
    </div>
  );
}

export default ProductsGrid;
