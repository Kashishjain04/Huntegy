import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import startSvg from "../assets/start.svg";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { isLoading, setLoading } from "../redux/loadSlice";

const db = firebase.firestore;

const Game = (props) => {
  const dispatch = useDispatch(),
    loading = useSelector(isLoading),
    { gameId } = props.match.params,
    [dbGame, setDbGame] = useState(null),
    [dbTeams, setDbTeams] = useState([]);

  useEffect(() => {
    return () => {
      setDbGame(null);
      setDbTeams([]);
    };
  }, []);

  useEffect(() => {
    dispatch(setLoading(true));
    db()
      .doc(`games/${gameId}`)
      .onSnapshot((snap) => {
        if (snap.exists) setDbGame({ ...snap.data(), id: snap.id });
        dispatch(setLoading(false));
      });
    //eslint-disable-next-line
  }, [gameId]);

  useEffect(() => {
    if (dbGame) {
      setDbTeams([]);
      dispatch(setLoading(true));
      db()
        .collection("teams")
        .where("gameId", "==", dbGame.id)
        .orderBy("score", "desc")
        .orderBy("teamName", "asc")
        .onSnapshot(async (snap) => {
          setDbTeams([]);
          snap.docs.forEach((doc) =>
            setDbTeams((prev) => [...prev, { ...doc.data(), teamId: doc.id }])
          );
          dispatch(setLoading(false));
        });
    }
    //eslint-disable-next-line
  }, [dbGame]);

  const shuffledHints = (hints) => {
    let array = hints;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    for (let i = 0; i < array.length; i++) {
      array[i] = { ...array[i], solved: false };
    }
    return array;
  };
  const unShuffledHints = (hints) => {
    let array = hints;
    for (let i = 0; i < array.length; i++) {
      array[i] = { ...array[i], solved: false };
    }
    return array;
  };

  const createTeams = async () => {
    let teamIds = [];
    for (let i = 1; i < dbGame.numberOfTeams + 1; i++) {
      await db()
        .collection("teams")
        .add({
          teamName: `Team ${i}`,
          gameName: dbGame.name,
          gameId: dbGame.id,
          hints: dbGame.shuffle
            ? shuffledHints(dbGame.hints)
            : unShuffledHints(dbGame.hints),
          score: 0,
          initialized: false,
        })
        .then((docRef) => {
          teamIds.push(docRef.id);
        })
        .catch((err) => console.log(err));
    }
    return teamIds;
  };

  const startGame = async () => {
    setLoading(true);
    const teamIds = await createTeams();
    db()
      .doc(`games/${gameId}`)
      .update({ teams: teamIds, started: true })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-4xl py-4 text-center border-b bg-white">
        {dbGame?.name}
      </h1>
      {dbGame?.started ? (
        <>
          <div className="w-full sm:max-w-xl mx-auto mt-7 sm:my-7 rounded-md bg-white sm:border sm:border-gray-300 p-5">
            <p className="text-3xl pb-1 border-b">Leaderboard</p>
            <table className="w-full text-center">
              <thead className="border-b">
                <tr>
                  <th>Position</th>
                  <th>Team Name</th>
                  <th>Invite</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {dbTeams.map((team, index) => (
                  <tr key={index} className="h-10">
                    <td>{index + 1}</td>
                    <td className="line-clamp-1 my-3">{team.teamName}</td>
                    <td>
                      <i
                        className="bx bx-copy-alt cursor-pointer"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `${window.location.origin}/player/${team.teamId}`
                          )
                        }
                      />
                    </td>
                    <td>{team.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <button
          onClick={startGame}
          className="flex items-center space-x-3 border rounded-lg w-max mx-auto px-4 py-2 bg-white mt-7 hover:shadow-lg focus:outline-none"
        >
          <img src={startSvg} alt="vector" className="w-28" />
          <span className="text-2xl">START</span>
        </button>
      )}
      <div className="w-full sm:max-w-xl mx-auto mt-7 sm:my-7 rounded-md bg-white sm:border sm:border-gray-300 p-5 space-y-3">
        <p className="text-3xl pb-1 border-b">Hints</p>
        {dbGame?.hints?.map((hint, index) => (
          <div key={index} className="px-4 py-2 border rounded-md">
            <div className="line-clamp-1">
              <strong>Hint: </strong>
              {hint.hint}
            </div>
            <div className="line-clamp-1">
              <strong>Answer: </strong>
              {hint.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
