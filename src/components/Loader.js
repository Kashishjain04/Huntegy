import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-screen grid place-items-center bg-gray-100">
      <div className="loader rounded-full border-8 border-t-8 border-gray-300 h-24 w-24 sm:h-32 sm:w-32" />
    </div>
  );
};

export default Loader;
