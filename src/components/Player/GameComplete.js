import React from "react";
import complete from "../../assets/complete.svg";

const GameComplete = () => {
  return (
    <div className="flex-grow flex flex-col justify-evenly items-center w-full sm:max-w-xl mx-auto mt-7 sm:my-7 rounded-md bg-white sm:border sm:border-gray-300 p-5 space-y-3">
      <img src={complete} alt="vector" className="h-80 sm:h-96" />
      <h1 className="text-3xl text-center">Yohoo! Here is the Treasure</h1>
    </div>
  );
};

export default GameComplete;
