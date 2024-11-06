import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SaleForm from "./SaleForm";
import VoucherTable from "./VoucherTable";
import useRecordStore from "../stores/useRecordStore";
import endpoint from "../constant/endpoint";
import { useSWRConfig } from "swr";
import { tailspin } from "ldrs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
tailspin.register();

const VoucherInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { records, resetRecord } = useRecordStore();
  const [isSending, setIsSending] = useState(false);
  const { mutate } = useSWRConfig();
  const nav = useNavigate();

  const onSubmit = async (data) => {
    const total = records.reduce((pv, cv) => {
      return pv + cv.cost;
    }, 0);
    const tax = total * 0.07;
    const net_total = total + tax;

    const currentVoucher = { ...data, records, total, tax, net_total };

    setIsSending(true);

    const res = await fetch(`${endpoint}/vouchers`, {
      method: "POST",
      body: JSON.stringify(currentVoucher),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log(res);

    const json = await res.json();

    console.log(json);

    if (res.status === 201) {
      toast.success("Voucher has been created");
      setIsSending(false);
      resetRecord();
      reset();
      if (data.redirect_to_voucher_detail) {
        nav(`/voucher/detail/${json.voucher.id}`);
      }
    } else {
      toast.error(json.message);
    }
  };

  const generateRandomInvoice = () => {
    // Get the current date
    const date = new Date();

    // Format the date as YYYYMMDD
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");

    // Generate a random number between 1000 and 9999
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    // Combine the formatted date and the random number
    const invoiceNumber = `INV-${formattedDate}-${randomNumber}`;

    return invoiceNumber;
  };

  return (
    <section>
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-3">
          <SaleForm />
          <VoucherTable />
        </div>
        <div className="col-span-1">
          <form
            id="formInfo"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <div className="grid grid-cols-1 gap-5 mb-10">
              <div className="col-span-1">
                <div>
                  <label
                    htmlFor="voucher-id"
                    className={`block mb-2 text-sm font-medium text-gray-900 ${
                      errors.voucher_id && "text-red-500"
                    }`}
                  >
                    Voucher ID
                  </label>
                  <input
                    {...register("voucher_id", { required: true })}
                    defaultValue={generateRandomInvoice()}
                    name="voucher_id"
                    type="text"
                    id="voucher-id"
                    placeholder="e.g Hosting"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white   ${
                    errors?.voucher_id
                      ? "border-red-500 border focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }  `}
                  />
                  {errors.voucher_id?.type === "required" && (
                    <Alert message={"Voucher field is required"} />
                  )}
                </div>
              </div>
              <div className="col-span-1">
                <div>
                  <label
                    htmlFor="customer-name"
                    className={`block mb-2 text-sm font-medium text-gray-900 ${
                      errors.customer_name && "text-red-500"
                    }`}
                  >
                    Customer Name
                  </label>
                  <input
                    {...register("customer_name", {
                      required: true,
                      minLength: 3,
                      maxLength: 30,
                    })}
                    name="customer_name"
                    type="text"
                    id="customer-name"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white   ${
                    errors?.customer_name
                      ? "border-red-500 border focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }  `}
                  />
                  {errors.customer_name?.type === "required" && (
                    <Alert message={"Customer name field is required"} />
                  )}
                  {errors.customer_name?.type === "minLength" && (
                    <Alert
                      message={"Customer name must be at least 3 characters"}
                    />
                  )}
                  {errors.customer_name?.type === "maxLength" && (
                    <Alert
                      message={"Customer name must be less than 20 characters"}
                    />
                  )}
                </div>
              </div>
              <div className="col-span-1">
                <div>
                  <label
                    htmlFor="customer-email"
                    className={`block mb-2 text-sm font-medium text-gray-900 ${
                      errors.customer_email && "text-red-500"
                    }`}
                  >
                    Customer Email
                  </label>
                  <input
                    {...register("customer_email", {
                      required: true,
                      minLength: 10,
                      maxLength: 50,
                    })}
                    name="customer_email"
                    type="email"
                    id="customer-email"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white   ${
                    errors?.customer_email
                      ? "border-red-500 border focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }  `}
                  />
                  {errors.customer_email?.type === "required" && (
                    <Alert message={"Customer email field is required"} />
                  )}
                  {errors.customer_email?.type === "minLength" && (
                    <Alert
                      message={"Customer email must be at least 10 characters"}
                    />
                  )}
                  {errors.customer_email?.type === "maxLength" && (
                    <Alert
                      message={"Customer email must be less than 50 characters"}
                    />
                  )}
                </div>
              </div>
              <div className="col-span-1">
                <div>
                  <label
                    htmlFor="sale-date"
                    className={`block mb-2 text-sm font-medium text-gray-900 ${
                      errors.sale_date && "text-red-500"
                    }`}
                  >
                    Sale Date
                  </label>
                  <input
                    {...register("sale_date", { required: true })}
                    name="sale_date"
                    type="date"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    id="sale-date"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white   ${
                    errors?.sale_date
                      ? "border-red-500 border focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }  `}
                  />
                  {errors.sale_date?.type === "required" && (
                    <Alert message={"Sale date field is required"} />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 justify-end mt-auto items-end">
              <div className="flex items-center gap-1">
                <label
                  htmlFor="view-voucher"
                  className=" text-sm font-medium text-gray-900"
                >
                  Redirect to voucher detail
                </label>
                <input
                  {...register("redirect_to_voucher_detail")}
                  name="redirect_to_voucher_detail"
                  id="view-voucher"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
              </div>
              <div className="flex items-center gap-1">
                <label
                  htmlFor="make-sure"
                  className="text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Make sure all field are correct
                </label>
                <input
                  {...register("all_correct")}
                  name="all_correct"
                  id="make-sure"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <button
                form="formInfo"
                type="submit"
                className="text-white flex items-center gap-2 justify-center bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-5 focus:outline-none"
              >
                <span> Confirm Voucher</span>
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
      </div>
    </section>
  );
};

export default VoucherInfo;
