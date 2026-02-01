import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useApolloClient, useMutation, useQuery } from "@apollo/client/react";
import { ALL_AUTHORS, ALL_BOOKS, LOGIN, ME } from "./queries";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginForm";
import UserPage from "./components/UserPage";

const App = () => {
  const authors = useQuery(ALL_AUTHORS);

  const [token, setToken] = useState(
    localStorage.getItem("user-token"),
  );
  const user = useQuery(ME, {
    skip: !token,
  })
  
  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)

      client.resetStore()
    }
  })
  const client = useApolloClient()

  if (authors.loading) {
    return <h1>Loading...</h1>;
  }

  const loginUser = (username, password) => {
    login({variables: {username, password}})
  }

  const logoutUser = async () => {
    localStorage.clear()
    setToken('')
    client.clearStore()
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <h1>Library</h1>
          {user?.data?.me && token && (
            <div>
              <h2>User is logged in</h2>
              <Navigation />
              <Outlet />
            </div>
          )}
          <LoginForm token={token} loginUser={loginUser} logoutUser={logoutUser}/>
        </>
      ),
      children: [
        {
          path: "/authors",
          element: <Authors authors={authors.data.allAuthors} />,
        },
        {
          path: "/books",
          element: <Books/>,
        },
        {
          path: "/user",
          element: <UserPage currentUser={user?.data?.me}/>,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
