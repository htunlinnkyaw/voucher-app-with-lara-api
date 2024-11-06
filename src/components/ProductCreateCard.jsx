import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import endpoint from "../constant/endpoint";
import toast from "react-hot-toast";
import { tailspin } from "ldrs";
import Alert from "./Alert";
tailspin.register();

const ProductCreateCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSending, setIsSending] = useState(false);

  const nav = useNavigate();

  const handleCreateProduct = async (data) => {
    setIsSending(true);

    await fetch(`${endpoint}/products`, {
      method: "POST",
      body: JSON.stringify({
        product_name: data.product_name,
        price: data.price,
        created_at: new Date().toISOString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsSending(false);

    reset();

    if (data.back_to_product_list) {
      nav("/product");
    }

    toast.success("Product has been created!");
  };

  return (
    <div className="md:w-1/2 w-full">
      <div className="mb-5">
        <h1 className="mt-5 font-bold text-3xl">Create New Product</h1>
        <p className="mt-2 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias
          necessitatibus quos earum itaque.
        </p>
      </div>
      <form onSubmit={handleSubmit(handleCreateProduct)}>
        <div className="mb-5">
          <label
            htmlFor="product-name"
            className={`block mb-2 text-sm font-medium text-gray-900 ${
              errors.product_name && "text-red-500"
            }`}
          >
            New Product Name
          </label>
          <input
            {...register("product_name", {
              required: true,
              minLength: 3,
              maxLength: 30,
            })}
            disabled={isSending}
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
            disabled={isSending}
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
            className="checkbox-style"
            value={true}
          />
          <label htmlFor="check-one" className="label-checkbox">
            Make sure all field are correct
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input
            {...register("back_to_product_list")}
            name="back_to_product_list"
            id="check-two"
            type="checkbox"
            className="checkbox-style"
            value={true}
          />
          <label htmlFor="check-two" className="label-checkbox">
            Back to Product List after saving
          </label>
        </div>
        <div className="mt-5">
          <Link to={"/product"} className="btn-outline">
            Cancel
          </Link>
          <button type="submit" className="btn">
            <span>Save Product</span>
            {isSending && (
              <l-tailspin
                size="20"
                stroke="5"
                speed="0.9"
                color="white"
              ></l-tailspin>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreateCard;
