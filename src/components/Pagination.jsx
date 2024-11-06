import React from "react";
import {
  HiArrowLeft,
  HiArrowRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

const Pagination = ({
  links: { prev, next },
  meta: { total, from, to, links },
  updateFetchUrl,
}) => {
  // const handleNextBtn = async () => updateFetchUrl(next);
  // const handlePrevBtn = async () => updateFetchUrl(prev);
  // console.log(links);

  return (
    <div>
      <div className="flex justify-between items-center mt-2">
        {/* Help text */}
        <span className="text-sm  select-none text-gray-700 dark:text-gray-400">
          Showing
          <span className="font-semibold text-gray-900 dark:text-white">
            &nbsp;{from}&nbsp;
          </span>
          to
          <span className="font-semibold text-gray-900 dark:text-white">
            &nbsp;{to}&nbsp;
          </span>
          of
          <span className="font-semibold text-gray-900 dark:text-white">
            &nbsp;{total}&nbsp;
          </span>
          Entries
        </span>
        {/* Buttons */}
        <div className="inline-flex mt-2 xs:mt-0">
          {/* <button
            disabled={!prev}
            onClick={handlePrevBtn}
            className="flex items-center disabled:pointer-events-none disabled:opacity-50 justify-center px-3 h-8 text-sm font-medium  bg-white shadow-md text-stone-500 rounded-s hover:bg-gray-300 dark:bg-gray-300 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <HiArrowLeft />
          </button>
          <button
            disabled={!next}
            onClick={handleNextBtn}
            className="flex items-center disabled:pointer-events-none disabled:opacity-50 justify-center px-3 h-8 text-sm font-medium  bg-white text-stone-500 shadow-md border-0 border-s border-gray-300 rounded-e hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <HiArrowRight />
          </button> */}

          {links.map((link) => {
            return (
              <button
                key={link.label}
                disabled={!link.url}
                onClick={() => updateFetchUrl(link.url)}
                className={`${
                  link.active && "bg-blue-300 hover:bg-blue-300"
                } flex disabled:opacity-50  text-stone-600 items-center justify-center px-3 h-8 leading-tight  bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                {link.label === "&laquo; Previous" ? (
                  <HiChevronLeft />
                ) : link.label === "Next &raquo;" ? (
                  <HiChevronRight />
                ) : (
                  <span className="text-sm">{link.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
