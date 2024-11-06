import React, { useState } from "react";
import { HiPlus, HiSearch } from "react-icons/hi";
import ProductRow from "./ProductRow";
import ProductRowEmpty from "./ProductRowEmpty";
import endpoint from "../constant/endpoint";
import useSWR from "swr";
import ProductListLoader from "./ProductListLoader";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import Pagination from "./Pagination";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ProductList = () => {
  const [fetchUrl, setFetchUrl] = useState(`${endpoint}/products`);
  const { data, isLoading, error } = useSWR(fetchUrl, fetcher);

  const handleSearch = debounce((event) => {
    setFetchUrl(`${endpoint}/products?q=${event.target.value}`);
  }, 500);

  const updateFetchUrl = (url) => {
    setFetchUrl(url);
  };

  console.log(data);

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <form className="max-w-[220px]">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <HiSearch className="size-5 text-gray-400" />
            </div>
            <input
              onChange={handleSearch}
              type="search"
              id="default-search"
              className="block w-full px-4 outline-none py-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-stone-500 focus:border-stone-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-stone-500 dark:focus:border-stone-500"
              placeholder="Search Product"
            />
          </div>
        </form>

        <Link
          to={"/product/create"}
          type="button"
          className="text-white flex items-center gap-1 justify-center bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-stone-600 dark:hover:bg-stone-700 focus:outline-none dark:focus:ring-stone-800"
        >
          <span>Add New Product</span>
          <HiPlus className="size-4" />
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <ProductListLoader />
            ) : data?.data?.length === 0 ? (
              <ProductRowEmpty />
            ) : (
              data?.data?.map((product, index) => (
                <ProductRow key={product.id} index={index} product={product} />
              ))
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && (
        <Pagination
          links={data?.links}
          meta={data?.meta}
          updateFetchUrl={updateFetchUrl}
        />
      )}
    </div>
  );
};

export default ProductList;
