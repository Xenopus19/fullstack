import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {message: '', isError: false},
    reducers: {
        setNotification(state, action) {
            state.message = action.payload.message
            state.isError = action.payload.isError
        },
        resetNotification(state, action) {
            state.message = ''
        }
    }
})

const { setNotification, resetNotification } = notificationSlice.actions

export const makeNotification = (message, isError, time = 3000) => {
    return async (dispatch) => {
        dispatch(setNotification({message, isError}))
        setTimeout(() => dispatch(resetNotification()), time)
    }
}

export default notificationSlice.reducer