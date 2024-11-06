import React from "react";
import useRecordStore from "../stores/useRecordStore";
import { HiOutlineTrash } from "react-icons/hi";

const VoucherTableRow = ({
  record: {
    id,
    product: { product_name, price },
    quantity,
    cost,
  },
  index,
}) => {
  const { removeRecord, changeQuantity } = useRecordStore();

  const handleRemoveBtn = () => removeRecord(id);
  const handleIncreaseBtn = () => changeQuantity(id, 1);
  const handleDecreaseBtn = () => quantity > 1 && changeQuantity(id, -1);

  return (
    <>
      <tr className="bg-white border-b group">
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">{product_name}</td>
        <td className="px-6 py-4 text-end">{price}</td>
        <td className="px-6 py-4 text-end">
          <div className="space-x-1">
            <button
              onClick={handleDecreaseBtn}
              className="bg-zinc-100 active:scale-95 select-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 text-stone-600 size-6 rounded transition-opacity duration-200"
            >
              -
            </button>
            <span className="text-right select-none">{quantity}</span>
            <button
              onClick={handleIncreaseBtn}
              className="bg-zinc-100 active:scale-95 select-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 text-stone-600 size-6 rounded transition-opacity duration-200"
            >
              +
            </button>
          </div>
        </td>
        <td className="px-6 py-4 text-end">{cost.toFixed(2)}</td>
        <td>
          <button
            onClick={handleRemoveBtn}
            className="bg-zinc-100 text-stone-600 select-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 duration-200 transition-opacity size-7 rounded flex items-center justify-center"
          >
            <HiOutlineTrash className="size-3" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default VoucherTableRow;
