import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTeamId, setTeamId } from "../redux/playerSlice";
import firebase from "../firebase";
import GameComplete from "../components/Player/GameComplete";
import Leaderboard from "../components/Player/Leaderboard";
import Hint from "../components/Player/Hint";
import Loader from "../components/Loader";

const db = firebase.firestore;

const Player = () => {
  const dispatch = useDispatch(),
    teamId = useSelector(selectTeamId),
    [dbTeam, setDbTeam] = useState(null),
    [hintIndex, setHintIndex] = useState(0),
    [showLead, setShowLead] = useState(false),
    [ans, setAns] = useState(""),
    [loading, setLoading] = useState(true);

  useEffect(() => {
    if (teamId) {
      db()
        .doc(`teams/${teamId}`)
        .onSnapshot(async (snap) => {
          if (snap.exists) {
            setDbTeam(snap.data());
            let i = 0;
            for (; i < snap.data().hints?.length; i++) {
              if (snap.data().hints[i]?.solved === false) {
                setHintIndex(i);
                setLoading(false);
                break;
              }
            }
            if (i === snap.data().hints?.length) {
              setHintIndex(-1);
              setLoading(false);
            }
          } else setLoading(false);
        });
    }
    return () => {
      setDbTeam(null);
      setHintIndex(0);
      setShowLead(false);
    };
  }, [teamId]);

  const exitGame = () => {
    localStorage.removeItem("teamId");
    dispatch(setTeamId(""));
  };

  const submitHint = (e) => {
    e.preventDefault();
    setLoading(true);
    if (ans !== dbTeam?.hints[hintIndex]?.answer) {
      setLoading(false);
      return alert("Oops! Wrong Ans");
    }
    let newHints = dbTeam?.hints;
    newHints[hintIndex].solved = true;
    db()
      .doc(`teams/${teamId}`)
      .update({
        hints: newHints,
        score: db.FieldValue.increment(10),
      })
      .then(async () => {
        setAns("");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <h1 className="text-3xl sm:text-4xl p-4 text-center border-b bg-white">
        <div className="max-w-[11rem] sm:max-w-xl overflow-hidden inline-block whitespace-nowrap overflow-ellipsis">
          {dbTeam?.gameName}
        </div>
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          {showLead ? (
            <i
              onClick={() => setShowLead(false)}
              className="bx bx-home-alt text-2xl p-1 border rounded-full cursor-pointer"
            />
          ) : (
            <i
              onClick={() => setShowLead(true)}
              className="bx bx-trophy text-2xl p-1 border rounded-full cursor-pointer"
            />
          )}
          <span
            onClick={exitGame}
            className="text-xl p-1 border rounded-full cursor-pointer"
          >
            Exit
          </span>
        </div>
      </h1>
      {showLead ? (
        <Leaderboard gameId={dbTeam?.gameId} />
      ) : hintIndex === -1 ? (
        <GameComplete />
      ) : (
        <Hint
          hint={dbTeam?.hints[hintIndex]}
          submitHint={submitHint}
          ans={ans}
          setAns={setAns}
        />
      )}
    </div>
  );
};

export default Player;
