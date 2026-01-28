import { createSlice } from "@reduxjs/toolkit";
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        resetUser(state, action) {
            return null
        }
    }
})

const { setUser, resetUser } = userSlice.actions

export const authorizeUser = (username, password) => {
    return async (dispatch) => {
        try{
            const user = await loginService.login({ username, password });
            dispatch(setUser(user.data))
            blogService.setToken(user.data.token);
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));

            return user
        }
        catch(error){ 
            throw error
        }
        
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        dispatch(resetUser())
        window.localStorage.clear();
        blogService.setToken("");
    }
}

export const loadUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user.data))
            blogService.setToken(user.data.token);
        }
}}

export default userSlice.reducer