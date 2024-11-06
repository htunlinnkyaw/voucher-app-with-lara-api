import React from "react";

const ShowDate = ({ timestamp }) => {
  const formatDate = new Date(timestamp);

  const date = formatDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const time = formatDate.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <>
      <p className="text-xs">{date}</p>
      <p className="text-xs">{time}</p>
    </>
  );
};

export default ShowDate;
