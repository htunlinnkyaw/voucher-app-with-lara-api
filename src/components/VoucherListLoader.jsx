import React from "react";

const VoucherListLoader = () => {
  return (
    <>
      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-24 animate-pulse"></div>
        </td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-stone-900 whitespace-nowrap dark:text-white"
        >
          <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-36 animate-pulse"></div>
        </th>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-40 animate-pulse"></div>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="h-4 ml-auto bg-gray-200 rounded-md dark:bg-gray-700 w-20 animate-pulse"></div>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <div className="h-8 w-8 bg-gray-200 rounded-s  animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-e  animate-pulse ml-0.5"></div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default VoucherListLoader;
