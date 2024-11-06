import React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import endpoint from "../constant/endpoint";
import useRecordStore from "../stores/useRecordStore";
import Alert from "./Alert";

const fetcher = (url) => fetch(url).then((res) => res.json());

const SaleForm = () => {
  const { data, isLoading, error } = useSWR(`${endpoint}/products`, fetcher);

  const { addRecord, records, changeQuantity } = useRecordStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const currentProduct = JSON.parse(data.product);

    const currentProductId = currentProduct.id;

    const isExisted = records.find(
      ({ product: { id } }) => currentProductId === id
    );

    console.log(isExisted);

    if (isExisted) {
      changeQuantity(isExisted.product_id, data.quantity);
    } else {
      const newRecord = {
        product: currentProduct,
        product_id: currentProduct.id,
        quantity: data.quantity,
        cost: currentProduct.price * data.quantity,
        created_at: new Date().toISOString(),
      };

      addRecord(newRecord);
    }

    reset();
  };

  return (
    <form
      className="mb-2 mt-3 border border-gray-100 bg-white rounded-md p-5 shadow"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-5  gap-5">
        <div className="col-span-2">
          <label
            htmlFor="product"
            className={`block mb-2 text-sm font-medium text-gray-900 ${
              errors.product && "text-red-500"
            }`}
          >
            Select an option
          </label>
          <select
            {...register("product", {
              required: true,
            })}
            id="product"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white   ${
                errors?.product
                  ? "border-red-500 border focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }  `}
          >
            <option value="">Choose a Product</option>
            {!isLoading &&
              data?.data?.map((product) => (
                <option key={product.id} value={JSON.stringify(product)}>
                  {product.product_name}
                </option>
              ))}
          </select>
          {errors.product?.type === "required" && (
            <Alert message={"Product field is required"} />
          )}
        </div>
        <div className="col-span-2">
          <div>
            <label
              htmlFor="quantity"
              className={`block mb-2 text-sm font-medium text-gray-900 ${
                errors.product && "text-red-500"
              }`}
            >
              Quantity
            </label>
            <input
              {...register("quantity", {
                required: true,
                min: 1,
                max: 25,
              })}
              name="quantity"
              type="number"
              id="quantity"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white   ${
                  errors?.quantity
                    ? "border-red-500 border focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }  `}
            />
            {errors.product?.type === "required" && (
              <Alert message={"Quantity field is required"} />
            )}
            {errors.product?.type === "min" && (
              <Alert message={"Quantity is at least 1 character"} />
            )}
            {errors.product?.type === "max" && (
              <Alert message={"Quantity is at most 25 characters"} />
            )}
          </div>
        </div>
        <div className="col-span-1">
          <button
            type="submit"
            className="text-stone-700 px-5 py-5 mt-3 hover:text-white border border-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center  dark:border-stone-500 dark:text-stone-500 dark:hover:text-white dark:hover:bg-stone-500 dark:focus:ring-stone-800"
          >
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default SaleForm;
