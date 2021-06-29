import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameCard from "../components/Host/GameCard";
import Login from "../components/Host/Login";
import NewGameCard from "../components/Host/NewGameCard";
import Loader from "../components/Loader";
import firebase from "../firebase";
import { isLoading, setLoading } from "../redux/loadSlice";
import { selectUser } from "../redux/userSlice";

const db = firebase.firestore;

const Host = () => {
  const dispatch = useDispatch(),
    loading = useSelector(isLoading),
    user = useSelector(selectUser),
    [games, setGames] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));
    if (user) {
      db()
        .doc(`hosts/${user.email}`)
        .onSnapshot((snap) => {
          if (snap.exists) setGames(snap.data().games);
          dispatch(setLoading(false));
        });
    } else {
      dispatch(setLoading(false));
    }
    return () => {
      setGames([]);
    };
    //eslint-disable-next-line
  }, [user]);

  const deleteGame = (index, id) => {
    dispatch(setLoading(true));
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
          .then(() => dispatch(setLoading(false)));
      })
      .catch((err) => console.log(err));
  };

  return loading ? (
    <Loader />
  ) : !user ? (
    <Login />
  ) : (
    <div className="min-h-screen bg-gray-100 w-max">
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
