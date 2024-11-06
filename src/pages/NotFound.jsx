import React from "react";
import NotFoundImg from "../assets/notfound.svg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <img src={NotFoundImg} className="w-[300px]" alt="not-found-image" />
      <div className="mt-2">
        <p className="w-[300px] mx-auto text-center text-sm font-medium text-gray-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
        <p className="text-center">
          <span className="font-bold text-gray-500">404</span>{" "}
          <span className="font-medium text-sm text-gray-500">
            PAGE NOT FOUND
          </span>
        </p>
        <div className="flex items-center justify-center">
          <Link to={"/"} className="btn btn-primary mt-4">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
