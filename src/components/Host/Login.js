import React from "react";
import { login } from "../../redux/userSlice";
import firebase from "../../firebase";
import { useDispatch } from "react-redux";

const auth = firebase.auth,
  db = firebase.firestore,
  provider = new auth.GoogleAuthProvider();

const Login = () => {
  const dispatch = useDispatch();

  const loginHandler = () => {
    auth()
      .signInWithPopup(provider)
      .then(({ additionalUserInfo }) => {
        const obj = {
          email: additionalUserInfo.profile.email,
          name: additionalUserInfo.profile.name,
          photoURL: additionalUserInfo.profile.picture,
        };
        if (additionalUserInfo.isNewUser) {
          db()
            .collection("hosts")
            .doc(additionalUserInfo.profile.email)
            .set(obj, { merge: true });
        }
        dispatch(login(obj));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-screen grid place-items-center">
      <div
        className="bg-blue-500 w-max p-1 rounded-md flex items-center cursor-pointer hover:shadow-xl"
        onClick={loginHandler}
      >
        <i className="bx bxl-google text-2xl border-r-2 border-white text-white px-1 mr-1" />
        <p className="text-white text-md px-1 font-sans">Signin to Continue</p>
      </div>
    </div>
  );
};

export default Login;
