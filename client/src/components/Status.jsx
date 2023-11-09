import React from "react";

const getStatusColor = (status) => {
  switch (status) {
    case "Confirm order":
    case "Return":
    case "Complete":
      return "bg-green-500";
    case "On-delivery":
    case "Pick-up":
    case "During the rental":
      return "bg-blue-700";
    case "Cancel":
      return "bg-red-600";
    default:
      return "bg-black";
  }
};

const Status = ({ status }) => {
  const backgroundColor = getStatusColor(status);

  return (
    <div className={`p-3 text-center text-white font-bold rounded-xl ${backgroundColor} px-20`}>
      <p>{status}</p>
    </div>
  );
};

export default Status;
