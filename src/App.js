import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Host from "./pages/Host";
import Landing from "./pages/Landing";
import firebase from "./firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/userSlice";
import NewGame from "./pages/NewGame";
import Game from "./pages/Game";
import PlayerLanding from "./pages/PlayerLanding";
import NotFound from "./pages/NotFound";

const auth = firebase.auth,
  db = firebase.firestore;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        db()
          .doc(`hosts/${user.email}`)
          .onSnapshot((snap) => {
            if (snap.exists) {
              dispatch(login(snap.data()));
              // setLoading(false);
            }
          });
      } else {
        dispatch(logout());
        // setLoading(false);
      }
    });
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/host" exact component={Host} />
        <Route path="/newGame" exact component={NewGame} />
        <Route path="/game/:gameId" exact component={Game} />
        <Route path="/player" exact component={PlayerLanding} />
        <Route path="/player/:teamId" exact component={PlayerLanding} />
        <Route path="/404" exact component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
