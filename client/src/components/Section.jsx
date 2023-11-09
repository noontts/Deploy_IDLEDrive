import React from "react";

const Section = ({ children, title }) => {
  return (
    <div>
      <div className="font-bold text-2xl my-2">{title}</div>
      <div className="py-3">{children}</div>
    </div>
  );
};

export default Section;
