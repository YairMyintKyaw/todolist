import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  uid: "",
  email: "",
  todoList: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      return { ...state, ...payload };
    },
    updateTodoList: (state, { payload }) => {
      return {
        ...state,
        todoList: payload,
      };
    },
  },
});

export const { setUserInfo, updateTodoList } = userSlice.actions;
export default userSlice.reducer;
