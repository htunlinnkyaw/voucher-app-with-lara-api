import React from "react";
import { Link } from "react-router-dom";

const ModuleBtn = ({ name, icon, url }) => {
  return (
    <Link
      to={url}
      className="flex flex-col h-full gap-3 items-center bg-stone-600 text-white p-5 rounded-lg"
    >
      {icon}
      {name}
    </Link>
  );
};

export default ModuleBtn;
