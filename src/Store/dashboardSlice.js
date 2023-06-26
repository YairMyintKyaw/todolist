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

    toggleNotStartedAddBox: (state, { payload }) => {
      return {
        ...state,
        isNotStartedAddBoxOn: payload,
      };
    },
    toggleOnProgressAddBox: (state, { payload }) => {
      return {
        ...state,
        isOnProgressAddBoxOn: payload,
      };
    },
    toggleCompletedAddBox: (state, { payload }) => {
      return {
        ...state,
        isCompletedAddBoxOn: payload,
      };
    },
  },
});

export const {
  toggleNavBar,
  toggleProjectDropdown,
  toggleAddProjectModal,
  toggleNotStartedAddBox,
  toggleOnProgressAddBox,
  toggleCompletedAddBox,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
