import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  uid: "",
  email: "",
  todoList: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      return { ...state, ...payload };
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
