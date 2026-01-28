import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import Message from "./components/Message";
import Toggleable from "./components/Toggleable";
import { useDispatch, useSelector } from "react-redux";
import { makeNotification } from "./reducers/notificationReducer";
import {
  addNewBlog,
  commentExistingBlog,
  deleteExistingBlog,
  initBlogs,
  updateExistingBlog,
} from "./reducers/blogsReducer";
import { authorizeUser, loadUser, logoutUser } from "./reducers/userReducer";
import Users from "./components/Users";
import MainPage from "./components/mainPage";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import UserInfo from "./components/UserInfo";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  const createBlogRef = useRef(null);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      await dispatch(authorizeUser(username, password));
      setUsername("");
      setPassword("");
      displayMessage("logged in", false);
    } catch {
      displayMessage("wrong credentials", true);
    }
  };

  const displayMessage = (message, isError) => {
    dispatch(makeNotification(message, isError));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleCreateBlog = async (blog) => {
    try {
      dispatch(addNewBlog(blog));
      displayMessage(
        `new blog added: ${result.title} by ${result.author}`,
        false,
      );
      createBlogRef.current.toggleVisibility();
    } catch {
      displayMessage("error adding blog", true);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>login</h2>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              autoComplete="username"
              placeholder="username"
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              autoComplete="current-password"
              placeholder="password"
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    );
  };

  const updateBlog = async (updatedBlog) => {
    try {
      await dispatch(updateExistingBlog(updatedBlog));
    } catch {
      dispatch(makeNotification("error updating blog", true));
    }
  };

  const deleteBlog = async (blogToDelete) => {
    if (!window.confirm(`Delete the ${blogToDelete.title} blog?`)) return;
    try {
      dispatch(deleteExistingBlog(blogToDelete));
    } catch {
      dispatch(makeNotification("error deleting blog", true));
    }
  };

  const commentBlog = (blog, comment) => {
    dispatch(commentExistingBlog(blog, comment))
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <div
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: "center",
              display: "flex",
              gap: 10,
              borderWidth: 1,
              borderColor: "black",
              border: "solid",
              borderRadius: 5,
              margin: 10,
              padding: 10,
            }}
          >
            <h4 style={{ marginTop: 0, marginBottom: 0 }}>User {user?.name} is logged in</h4>
            <button onClick={handleLogout}>Logout</button>
            <nav>
              <Link style={{ marginRight: 10 }} to="/users">
                users
              </Link>
              <Link style={{ marginRight: 10 }} to="/">
                blogs
              </Link>
            </nav>
          </div>
          <Outlet></Outlet>
        </>
      ),
      children: [
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/",
          element: (
            <MainPage
              createBlogRef={createBlogRef}
              handleCreateBlog={handleCreateBlog}
            />
          ),
        },
        {
          path: "/users/:id",
          element: <UserInfo />,
        },
        {
          path: "/blogs/:id",
          element: <Blog updateBlog={updateBlog} deleteBlog={deleteBlog} commentBlog={commentBlog} />,
        },
      ],
    },
  ]);

  return (
    <div>
      <Message />
      {user && (
        <div>
          <RouterProvider router={router} />
        </div>
      )}
      {!user && loginForm()}
    </div>
  );
};

export default App;
