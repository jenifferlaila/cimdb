import { createSlice } from "@reduxjs/toolkit";

import { PublicUserDTO, UserRoleDTO } from "../../services/types";
import { ADMIN } from "../../utils";

export type UserState = {
  isAdmin: boolean;
  role: UserRoleDTO | null;
  user: PublicUserDTO | null;
  token: string | null;
};

const initialState: UserState = {
  role: null,
  user: null,
  token: null,
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole: (state, { payload }) => {
      state.role = payload;

      if (payload && payload.value) {
        state.isAdmin = payload.value === ADMIN;
      }
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
  },
});

export const { setRole, setToken, setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
