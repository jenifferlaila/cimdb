import { createSlice } from "@reduxjs/toolkit";

export type MetaState = {
  loading: boolean;
};

const initialState: MetaState = {
  loading: false,
};

export const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { setLoading } = metaSlice.actions;

export const metaReducer = metaSlice.reducer;
