import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

const db = firebase.firestore;

const Leaderboard = ({ gameId }) => {
  const [dbTeams, setDbTeams] = useState([]);

  useEffect(() => {
    if (gameId) {
      setDbTeams([]);
      db()
        .collection("teams")
        .where("gameId", "==", gameId)
        .orderBy("score", "desc")
        .orderBy("teamName", "asc")
        .onSnapshot((snap) => {
          setDbTeams([]);
          snap.docs.forEach((doc) =>
            setDbTeams((prev) => [...prev, { ...doc.data(), teamId: doc.id }])
          );
        });
    }

    return () => {
      setDbTeams([]);
    };
  }, [gameId]);

  return (
    <div className="w-full sm:max-w-xl mx-auto mt-7 sm:my-7 rounded-md bg-white sm:border sm:border-gray-300 p-5 space-y-3">
      <p className="text-3xl pb-1 border-b">Leaderboard</p>
      <table className="w-full text-center">
        <thead className="border-b">
          <tr>
            <th>Position</th>
            <th>Team Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {dbTeams.map((team, index) => (
            <tr key={index} className="h-10">
              <td>{index + 1}</td>
              <td className="line-clamp-1 my-3">{team.teamName}</td>
              <td>{team.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
