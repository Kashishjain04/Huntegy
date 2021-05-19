import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import firebase from "../firebase";
import NewForm1 from "../components/Host/NewForm1";
import NewForm2 from "../components/Host/NewForm2";
import Loader from "../components/Loader";
import { isLoading, setLoading } from "../redux/loadSlice";

const db = firebase.firestore;

const NewGame = () => {
  const history = useHistory(),
    dispatch = useDispatch(),
    loading = useSelector(isLoading),
    user = useSelector(selectUser),
    [name, setName] = useState(""),
    [teams, setTeams] = useState(""),
    [shuffle, setShuffle] = useState(""),
    [exist, setExist] = useState(false),
    [dbGames, setDbGames] = useState(null),
    [formShown, setFormShown] = useState(1);

  useEffect(() => {
    db()
      .doc(`hosts/${user?.email}`)
      .onSnapshot((snap) => {
        if (snap.exists) setDbGames(snap.data().games);
      });
  }, [user]);

  useEffect(() => {
    return () => {
      setDbGames(null);
    };
  }, []);

  const submitGame = (hints) => {
    dispatch(setLoading(true));
    const obj = {
      name,
      numberOfTeams: Number(teams),
      shuffle,
      hints,
      timestamp: db.Timestamp.now(),
      started: false,
    };
    db()
      .collection("games")
      .add(obj)
      .then((docRef) => {
        db()
          .doc(`hosts/${user?.email}`)
          .update({
            games: db.FieldValue.arrayUnion({
              id: docRef.id,
              name: obj.name,
              timestamp: obj.timestamp,
            }),
          })
          .then(() => {
            dispatch(setLoading(false));
            history.replace("/host");
          });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log(err);
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-4xl py-4 text-center border-b bg-white">New Game</h1>
      {formShown === 1 ? (
        <NewForm1
          name={name}
          setName={setName}
          exist={exist}
          setExist={setExist}
          teams={teams}
          setTeams={setTeams}
          setShuffle={setShuffle}
          dbGames={dbGames}
          setFormShown={setFormShown}
        />
      ) : (
        <NewForm2 submitGame={submitGame} />
      )}
    </div>
  );
};

export default NewGame;
