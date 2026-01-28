import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const id = action.payload.id;
      return state.map((blog) => (blog.id === id ? action.payload : blog));
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions;

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addNewBlog = (blog) => {
  return async (dispatch) => {
    const result = await blogService.create(blog);
    dispatch(addBlog(result));
  };
};

export const updateExistingBlog = (blog) => {
  return async (dispatch) => {
    const result = await blogService.update(blog);
    dispatch(updateBlog(result));
  };
};

export const deleteExistingBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog);
    dispatch(deleteBlog(blog.id));
  };
};

export const commentExistingBlog = (blog, comment) => {
  return async (dispatch) => {
    const result = await blogService.commentBlog(blog, comment);
    dispatch(updateBlog(result));
  };
}; 

export default blogSlice.reducer;
