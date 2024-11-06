import React, { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import ShowDate from "./ShowDate";
import endpoint from "../constant/endpoint";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import { bouncy } from "ldrs";
import { Link } from "react-router-dom";
bouncy.register();

const ProductRow = ({
  product: { id, product_name, price, created_at },
  index,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate } = useSWRConfig();

  const handleDeleteBtn = async () => {
    setIsDeleting(true);
    const res = await fetch(`${endpoint}/products/${id}`, {
      method: "DELETE",
    });

    const json = await res.json();

    if (res.status === 200) {
      toast.success(json.message);
      mutate(`${endpoint}/products`);
      setIsDeleting(false);
    } else {
      toast.error(json.message);
    }
  };

  return (
    <>
      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {index + 1}
        </th>
        <td className="px-6 py-4">{product_name}</td>
        <td className="px-6 py-4 text-end">${price}</td>
        <td className="px-6 py-4 text-end">
          <ShowDate timestamp={created_at} />
        </td>
        <td className="px-6 py-4 text-end">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <Link
              to={`/product/edit/${id}`}
              className="size-10 flex items-center justify-center text-lg font-medium text-gray-500 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              <HiOutlinePencil />
            </Link>
            <button
              onClick={handleDeleteBtn}
              type="button"
              className="size-10 flex items-center justify-center text-lg font-medium text-gray-500 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              {isDeleting ? (
                <l-bouncy size="20" speed="1.75" color="gray"></l-bouncy>
              ) : (
                <HiOutlineTrash />
              )}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ProductRow;
