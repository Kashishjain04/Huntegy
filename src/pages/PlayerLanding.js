import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTeamId, setTeamId } from "../redux/playerSlice";
import Player from "./Player";
import firebase from "../firebase";
import { useHistory } from "react-router";
import Loader from "../components/Loader";

const db = firebase.firestore;

const PlayerLanding = (props) => {
  const history = useHistory(),
    dispatch = useDispatch(),
    teamId = useSelector(selectTeamId),
    [inp, setInp] = useState(""),
    [formShown, setFormShown] = useState(1),
    [dbTeam, setDbTeam] = useState(null),
    [loading, setLoading] = useState(true);

  // Is Team Name Initialized
  const isInitialized = async (id) =>
    await db()
      .doc(`teams/${id}`)
      .get()
      .then((data) => {
        if (data.exists) {
          setDbTeam(data.data());
          return data.data().initialized;
        }
        return false;
      });

  useEffect(() => {
    const urlTeamId = props.match.params.teamId;
    if (urlTeamId) {
      db()
        .doc(`teams/${urlTeamId}`)
        .get()
        .then((data) => {
          if (!data.exists) {
            return history.replace("/404");
          } else {
            localStorage.setItem("teamId", urlTeamId);
            dispatch(setTeamId(urlTeamId));
          }
          // setLoading(false);
        });
    }
    //eslint-disable-next-line
  }, [props]);

  useEffect(() => {
    // conditionally render form
    const renderForm = async () => {
      const initialized = await isInitialized(teamId);
      (await initialized) ? setFormShown(3) : setFormShown(2);
      setLoading(false);
    };

    // Dispatch teamId from localState
    const localId = localStorage.getItem("teamId");
    dispatch(setTeamId(localId));

    // validate teamId
    if (!teamId) {
      setFormShown(1);
      setLoading(false);
    } else {
      renderForm();
    }
    return () => {
      setLoading(true);
      setDbTeam(null);
    };
    //eslint-disable-next-line
  }, [teamId]);

  const submit1 = (e) => {
    e.preventDefault();
    setLoading(true);
    db()
      .doc(`teams/${inp}`)
      .get()
      .then((data) => {
        if (!data.exists) {
          return alert("Invalid Team ID");
        }
        data.data().initialized ? setFormShown(3) : setFormShown(2);
        localStorage.setItem("teamId", inp);
        dispatch(setTeamId(inp));
        setInp("");
        setLoading(false);
      });
  };

  const form1 = (
    <div className="grid place-items-center h-screen w-screen bg-gray-100">
      <form
        autoComplete="off"
        onSubmit={submit1}
        className="flex flex-col space-y-5 bg-white border border-gray-300 rounded-md p-5"
      >
        <input
          autoComplete="false"
          name="hidden"
          type="text"
          className="hidden"
        />
        <label htmlFor="teamId" className="">
          Enter Team ID provided by the Host
        </label>
        <input
          name="teamId"
          type="text"
          placeholder="TeamID..."
          className="rounded-md flex-grow border p-2 focus:outline-none"
          required
          value={inp}
          onChange={(e) => setInp(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg self-center border hover:shadow-md focus:outline-none"
        >
          Next
        </button>
      </form>
    </div>
  );

  const submit2 = (e) => {
    e.preventDefault();
    setLoading(true);
    db()
      .doc(`teams/${teamId}`)
      .update({ teamName: inp ? inp : dbTeam.teamName, initialized: true })
      .then(() => {
        setFormShown(3);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const form2 = (
    <div>
      <div className="grid place-items-center h-screen w-screen bg-gray-100">
        <form
          onSubmit={submit2}
          className="flex flex-col space-y-5 bg-white border border-gray-300 rounded-md p-5"
        >
          <label htmlFor="teamId" className="">
            Enter Team Name
          </label>
          <input
            name="teamId"
            type="text"
            placeholder={`Default ${dbTeam?.teamName}`}
            className="rounded-md flex-grow border p-2 focus:outline-none"
            value={inp}
            onChange={(e) => setInp(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg self-center border hover:shadow-md focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );

  return loading ? (
    <Loader />
  ) : (
    <div>{formShown === 3 ? <Player /> : formShown === 1 ? form1 : form2}</div>
  );
};

export default PlayerLanding;
