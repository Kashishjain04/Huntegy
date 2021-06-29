import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import playerReducer from "./playerSlice";
import loadReducer from "./loadSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer,
    loading: loadReducer,
  },
  devTools: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
