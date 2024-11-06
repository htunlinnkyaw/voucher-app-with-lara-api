import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import endpoint from "../constant/endpoint";
import { lineSpinner } from "ldrs";
import { HiDownload, HiPrinter } from "react-icons/hi";
import html2pdf from "html2pdf.js";
import printJS from "print-js";
lineSpinner.register();

const fetcher = (url) => fetch(url).then((res) => res.json());

const VoucherCard = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useSWR(
    `${endpoint}/vouchers/${id}`,
    fetcher
  );

  const handlePrint = () => {
    printJS({
      printable: "printArea",
      type: "html",
      css: [
        "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
      ],
    });
  };

  const handlePdf = () => {
    console.log("export pdf");
    const element = document.getElementById("printArea");

    html2pdf()
      .set({
        margin: 0.1,
        filename: `invoice_${id}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a5", orientation: "portrait" }, // Changed format to A5
      })
      .from(element)
      .save();
  };

  // Fix: Correctly format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="flex mt-5 items-center justify-start gap-2">
          <l-line-spinner
            size="25"
            stroke="3"
            speed="1"
            color="gray"
          ></l-line-spinner>
          <span className="font-medium text-sm">Loading...</span>
        </div>
      ) : (
        <div className="flex gap-2">
          <div
            className="bg-white   p-8 rounded-lg shadow-none max-w-[14.8cm] mt-2 w-full"
            id="printArea"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl font-bold">INVOICE</h1>
                <p className="text-gray-600 ">INV-20240924-2951</p>
              </div>
              <div className="text-justify">
                <h2 className=" font-semibold">Invoice To</h2>
                <p className="text-gray-600 text-sm">
                  {data?.data?.customer_name}
                </p>
                <div className="text-gray-600 text-sm ">
                  <p className="font-semibold mt-1">Sale Date</p>
                  <p className="text-[0.7rem]">
                    {formatDate(data?.data?.sale_date)}
                  </p>
                </div>
              </div>
            </div>

            <table className="w-full mb-8 text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">No</th>
                  <th className="text-left py-2">Description</th>
                  <th className="text-right py-2">Qty</th>
                  <th className="text-right py-2">Price</th>
                  <th className="text-right py-2">Cost</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.records.map((record, index) => (
                  <tr key={record.id}>
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{record.product.product_name}</td>
                    <td className="text-right py-2">{record.quantity}</td>
                    <td className="text-right py-2">{record.product.price}</td>
                    <td className="text-right py-2">{record.cost}</td>
                  </tr>
                ))}

                <tr className="border-t">
                  <td colSpan="4" className="text-right py-2 font-semibold">
                    Total
                  </td>
                  <td className="text-right py-2">
                    {parseFloat(data?.data?.total).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="4" className="text-right py-2 font-semibold">
                    Tax
                  </td>
                  <td className="text-right py-2">
                    {parseFloat(data?.data?.tax).toFixed(2)}
                  </td>
                </tr>
                <tr className="border-t">
                  <td colSpan="4" className="text-right py-2 font-semibold">
                    Net Total
                  </td>
                  <td className="text-right py-2 font-semibold">
                    {parseFloat(data?.data?.netTotal).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mb-8 text-xs">
              <h3 className="font-bold text-sm mb-2">Payment Transfer to</h3>
              <p>Kpay,Wave - 09250152018</p>
              <p>KBZ Bank - 02730102705025601</p>
              <p>AYA Bank - 20003674121</p>
            </div>

            <div className="text-xs">
              <h3 className="font-semibold text-xl mb-2">MMS IT</h3>
              <p>48, 1st Floor, Shan Kone St.</p>
              <p>+959-250-152-018</p>
              <p>enquiry@mms-it.com</p>
            </div>
            <div className="border-t mt-5 border-gray-300">
              <p className="font-light text-center pt-2  text-lg text-gray-300  mb-2">
                Thanks
              </p>
            </div>
          </div>
          <div className="flex gap-1 flex-col">
            <button
              onClick={handlePrint}
              className="bg-stone-500   flex items-center text-sm justify-center gap-1 text text-white px-4 py-2 rounded hover:bg-stone-600"
            >
              Print Voucher
              <HiPrinter className="size-5" />
            </button>
            <button
              onClick={handlePdf}
              className="bg-stone-500  flex items-center justify-center gap-1 text-sm text-white px-4 py-2 rounded hover:bg-stone-600"
            >
              Download PDF
              <HiDownload className="size-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VoucherCard;
