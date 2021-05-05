import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import playerReducer from "./playerSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer,
  },
  devTools: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
