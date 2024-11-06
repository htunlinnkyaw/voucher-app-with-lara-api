import React from "react";

const VoucherRowEmpty = () => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4 text-center" colSpan={5}>
        There is no voucher
      </td>
    </tr>
  );
};

export default VoucherRowEmpty;
