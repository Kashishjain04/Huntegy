import React from "react";
import { Link } from "react-router-dom";

const NewGameCard = () => {
  return (
    <Link
      to="/newGame"
      className="border rounded-2xl overflow-hidden w-48 cursor-pointer hover:shadow-lg bg-white"
    >
      <p className="bg-green-400 p-2 border-b line-clamp-1 text-xl">New Game</p>
      <div className="text-gray-500 py-1 text-center text-3xl">
        <i className="bx bx-plus" />
      </div>
    </Link>
  );
};

export default NewGameCard;
