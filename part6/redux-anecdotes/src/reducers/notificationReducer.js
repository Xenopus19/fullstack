import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state) {
      return "";
    },
  },
});

export const makeNotification = (message, time = 5000) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => dispatch(clearNotification()), time);
  };
};

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
