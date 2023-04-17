import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface USER_INFO {
  [keys: string]: string | number | string[] | boolean;
}

export interface LoginState {
  useInfo: USER_INFO;
  isAuthenticated: boolean;
  permissions: string[];
}

const initialState: LoginState = {
  useInfo: {},
  isAuthenticated: false,
  permissions: [],
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<USER_INFO>) => {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.useInfo, ...action.payload })
      );
      state.useInfo = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    clearStore: (state) => {
      state.useInfo = {};
      state.isAuthenticated = false;
      state.permissions = [];
    },
  },
});

export const { setUser, setAuthenticated, clearStore } = loginSlice.actions;

export default loginSlice.reducer;
