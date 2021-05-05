import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GameCard from "../components/Host/GameCard";
import Login from "../components/Host/Login";
import NewGameCard from "../components/Host/NewGameCard";
import Loader from "../components/Loader";
import firebase from "../firebase";
import { selectUser } from "../redux/userSlice";

const db = firebase.firestore;

const Host = () => {
  const user = useSelector(selectUser),
    [games, setGames] = useState([]),
    [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      db()
        .doc(`hosts/${user.email}`)
        .onSnapshot((snap) => {
          if (snap.exists) setGames(snap.data().games);
          setLoading(false);
        });
    }
    return () => {
      setGames([]);
    };
  }, [user]);

  const deleteGame = (index, id) => {
    setLoading(true);
    const newGames = games;
    newGames.splice(index, 1);
    db()
      .doc(`games/${id}`)
      .delete()
      .then(() => {
        db()
          .doc(`hosts/${user.email}`)
          .update({
            games: newGames,
          })
          .then(() => setLoading(false));
      })
      .catch((err) => console.log(err));
  };

  return loading ? (
    <Loader />
  ) : !user ? (
    <Login />
  ) : (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-4xl py-4 text-center border-b bg-white">Games</h1>
      <div className="p-4 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {games.map((game, index) => (
          <GameCard
            key={game.id}
            game={game}
            index={index}
            deleteGame={deleteGame}
          />
        ))}
        <NewGameCard />
      </div>
    </div>
  );
};

export default Host;
