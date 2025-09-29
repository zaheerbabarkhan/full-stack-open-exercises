import { createSlice } from "@reduxjs/toolkit"


const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return action.payload
    }
  }
})

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(removeNotification(""))
    }, time * 1000);
  }
}

export default notificationSlice.reducer

export const { showNotification, removeNotification } = notificationSlice.actions