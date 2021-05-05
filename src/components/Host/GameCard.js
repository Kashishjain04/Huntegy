import React from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

const db = firebase.firestore;

const GameCard = ({ game, index, deleteGame }) => {
  return (
    <div className="border rounded-2xl overflow-hidden w-48 hover:shadow-lg bg-white">
      <p className="bg-green-400 p-2 border-b line-clamp-1 text-xl">
        <i
          onClick={() => deleteGame(index, game.id)}
          className="bx bx-trash float-right z-10 p-1 rounded-full cursor-pointer hover:bg-gray-300"
        />
        <span>{game.name}</span>
      </p>
      <Link
        to={`/game/${game.id}`}
        className="text-gray-500 grid grid-cols-2 px-2"
      >
        <p>created-</p>
        <p>
          {new Date(
            new db.Timestamp(
              game.timestamp.seconds,
              game.timestamp.nanoseconds
            ).toMillis()
          ).toLocaleString()}
        </p>
      </Link>
    </div>
  );
};

export default GameCard;
