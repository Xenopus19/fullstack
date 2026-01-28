import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initUsers } from "../reducers/usersReducer";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h3>Users:</h3>
      {users.map((user) => {
        return (
          <li key={user.id}>
            <Link to={`/users/${user.id}`} >
              {user.name} created {user.blogs.length}
            </Link>
          </li>
        );
      })}
    </div>
  );
};

export default Users;
