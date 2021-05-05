import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    teamId: "",
  },
  reducers: {
    setTeamId: (state, action) => {
      state.teamId = action.payload;
    },
  },
});

export const { setTeamId } = playerSlice.actions;

export const selectTeamId = (state) => state.player.teamId;

export default playerSlice.reducer;
