import React from "react";

const CollapseForm = ({title, children}) => {
  return (
    <>
      <div className="collapse collapse-arrow bg-white shadow-lg mb-5">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          {title}
          <span className="ml-1 text-red-600">*</span>
        </div>
        <div className="collapse-content">
          { children }
        </div>
      </div>
    </>
  );
};

export default CollapseForm;
