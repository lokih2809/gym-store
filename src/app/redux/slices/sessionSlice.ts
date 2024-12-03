import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "next-auth";

interface SessionState {
  user: User | null;
}

interface ExtendedUser extends User {
  name?: string;
  phone?: string;
  address?: string;
}

const initialState: SessionState = {
  user: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<Partial<ExtendedUser>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
});

export const { setUser, clearUser, updateUser } = sessionSlice.actions;
export default sessionSlice.reducer;
