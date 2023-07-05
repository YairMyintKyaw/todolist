import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNavBarOn: true,
  isProjectDropdownOn: false,
  isAddProjectModalOn: false,
  isNotStartedAddBoxOn: false,
  isInProgressAddBoxOn: false,
  isCompletedAddBoxOn: false,
  isItemGrabbed: false,
  isLoading: false,
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
    toggleInProgressAddBox: (state, { payload }) => {
      return {
        ...state,
        isInProgressAddBoxOn: payload,
      };
    },
    toggleCompletedAddBox: (state, { payload }) => {
      return {
        ...state,
        isCompletedAddBoxOn: payload,
      };
    },
    setItemGrabbedCondition: (state, { payload }) => ({
      ...state,
      isItemGrabbed: payload,
    }),

    toggleLoading: (state, { payload }) => ({ ...state, isLoading: payload }),
  },
});

export const {
  toggleNavBar,
  toggleProjectDropdown,
  toggleAddProjectModal,
  toggleNotStartedAddBox,
  toggleInProgressAddBox,
  toggleCompletedAddBox,
  setItemGrabbedCondition,
  toggleLoading,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
