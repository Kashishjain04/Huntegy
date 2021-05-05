import React from "react";
import Image from "../assets/404.svg";

const NotFound = () => (
  <div className="h-screen bg-gray-100 flex flex-col items-center justify-center">
    <img src={Image} alt="vector" className="w-3/4 sm:w-1/2" />
    <p className="text-xl sm:text-4xl">OOPS! You Landed an Invalid Page...</p>
  </div>
);

export default NotFound;
