import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNavBarOn: true,
  isProjectDropdownOn: false,
  isAddProjectModalOn: false,
  isNotStartedAddBoxOn: false,
  isOnProgressAddBoxOn: false,
  isCompletedAddBoxOn: false,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleNavBar: (state, { payload }) => {
      return { ...state, isNavBarOn: payload };
    },

    toggleProjectDropdown: (state, { payload }) => {
      return { ...state, isProjectDropdownOn: payload };
    },

    toggleAddProjectModal: (state) => {
      return { ...state, isAddProjectModalOn: !state.isAddProjectModalOn };
    },

    toggleAddTaskModal: (state) => {
      return { ...state, isAddTaskModalOn: !state.isAddTaskModalOn };
    },

    toggleNotStartedAddBox: (state) => {
      return {
        ...state,
        isNotStartedAddBoxOn: !state.isNotStartedAddBoxOn,
      };
    },
    toggleOnProgressAddBox: (state) => {
      return {
        ...state,
        isOnProgressAddBoxOn: !state.isOnProgressAddBoxOn,
      };
    },
    toggleCompletedAddBox: (state) => {
      return {
        ...state,
        isCompletedAddBoxOn: !state.isCompletedAddBoxOn,
      };
    },
  },
});

export const {
  toggleNavBar,
  toggleProjectDropdown,
  toggleAddProjectModal,
  toggleAddTaskModal,
  toggleNotStartedAddBox,
  toggleOnProgressAddBox,
  toggleCompletedAddBox,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
