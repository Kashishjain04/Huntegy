import { createSlice } from "@reduxjs/toolkit";

export const loadSlice = createSlice({
  name: "loading",
  initialState: {
    loading: true,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loadSlice.actions;

export const isLoading = (state) => state.loading.loading;

export default loadSlice.reducer;
