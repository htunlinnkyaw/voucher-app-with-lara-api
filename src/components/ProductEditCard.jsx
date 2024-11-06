import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import endpoint from "../constant/endpoint";
import { useForm } from "react-hook-form";
import ProductEditLoader from "./ProductEditLoader";
import { tailspin } from "ldrs";
import toast from "react-hot-toast";
tailspin.register();
import Alert from "./Alert";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ProductEditCard = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { id } = useParams();
  const { data, isLoading, error } = useSWR(
    `${endpoint}/products/${id}`,
    fetcher
  );

  const { mutate } = useSWRConfig();

  const [isUpdating, setIsUpdating] = useState(false);

  const handleEditProduct = async (data) => {
    setIsUpdating(true);

    await fetch(`${endpoint}/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        product_name: data.product_name,
        price: data.price,
        created_at: new Date().toISOString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    mutate(`${endpoint}/products/${id}`);
    mutate(`${endpoint}/products`);

    setIsUpdating(false);
    reset();
    if (data.back_to_product_list) {
      nav("/product");
    }
    toast.success("Product has been updated");
  };

  return (
    <>
      {isLoading ? (
        <ProductEditLoader />
      ) : (
        <div className="md:w-1/2 w-full">
          <div className="mb-5">
            <h1 className="mt-5 font-bold text-3xl">Edit Product</h1>
            <p className="mt-2 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias
              necessitatibus quos earum itaque.
            </p>
          </div>
          <form onSubmit={handleSubmit(handleEditProduct)}>
            <div className="mb-5">
              <label
                htmlFor="product-name"
                className={`block mb-2 text-sm font-medium text-gray-900 ${
                  errors.product_name && "text-red-500"
                }`}
              >
                Product Name
              </label>
              <input
                {...register("product_name", {
                  required: true,
                  minLength: 3,
                  maxLength: 30,
                })}
                disabled={isUpdating}
                defaultValue={data?.data?.product_name}
                name="product_name"
                type="text"
                id="product-name"
                placeholder="e.g Hosting"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white   ${
                    errors?.product_name
                      ? "border-red-500 border focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }  `}
              />
              {errors?.product_name?.type === "required" && (
                <Alert message={"Product name is required"} />
              )}
              {errors?.product_name?.type === "minLength" && (
                <Alert message={"Product name must be at least 3 characters"} />
              )}
              {errors?.product_name?.type === "maxLength" && (
                <Alert message={"Product must be at most 30 characters"} />
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="product-price"
                className={`block mb-2 text-sm font-medium text-gray-900 ${
                  errors.price && "text-red-500"
                }`}
              >
                Product Price
              </label>
              <input
                {...register("price", {
                  required: true,
                  min: 100,
                  max: 10000,
                })}
                disabled={isUpdating}
                defaultValue={data?.data?.price}
                name="price"
                type="number"
                id="product-price"
                placeholder="e.g 1000"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white   ${
                    errors?.price
                      ? "border-red-500 border focus:ring-red-300 focus:border-red-100"
                      : "border-gray-300"
                  }  `}
              />
              {errors?.price?.type === "required" && (
                <Alert message={"Product price is required"} />
              )}
              {errors?.price?.type === "min" && (
                <Alert message={"Product price must be at least 100"} />
              )}
              {errors?.price?.type === "max" && (
                <Alert message={"Product price must be at most 10000"} />
              )}
            </div>
            <div className="flex items-center mb-4">
              <input
                {...register("all_correct")}
                name="all_correct"
                id="check-one"
                required
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                value={true}
              />
              <label
                htmlFor="check-one"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Make sure all field are correct
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                {...register("back_to_product_list")}
                name="back_to_product_list"
                id="check-two"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                value={true}
              />
              <label
                htmlFor="check-two"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Back to Product List after saving
              </label>
            </div>
            <div className="mt-5">
              <Link
                to={"/product"}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="text-white  bg-stone-700 inline-flex gap-3 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <span>Update Product</span>
                {isUpdating && (
                  <l-tailspin size={20} stroke="5" speed="0.9" color="white" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ProductEditCard;
