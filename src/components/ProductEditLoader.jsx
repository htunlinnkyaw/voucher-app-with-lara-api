import React from "react";

const ProductEditLoader = () => {
  return (
    <>
      <div className="md:w-1/2 w-full">
        <div className="mb-5">
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded-md mt-5"></div>
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md mt-2"></div>
        </div>
        <div className="mb-5">
          <div className="h-4 w-28 bg-gray-200 animate-pulse rounded-md mb-2"></div>
          <div className="h-10 w-full bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
        <div className="mb-5">
          <div className="h-4 w-28 bg-gray-200 animate-pulse rounded-md mb-2"></div>
          <div className="h-10 w-full bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-4 h-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-60 bg-gray-200 animate-pulse rounded-md ms-2"></div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-4 h-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-60 bg-gray-200 animate-pulse rounded-md ms-2"></div>
        </div>
        <div className="mt-5 flex gap-2">
          <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-md"></div>
          <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-md"></div>
        </div>
      </div>
    </>
  );
};

export default ProductEditLoader;
