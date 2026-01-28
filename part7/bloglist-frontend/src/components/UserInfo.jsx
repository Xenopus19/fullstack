import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserInfo = () => {
  const { id } = useParams();

  const user = useSelector((state) => state.users.find((u) => u.id === id));
  if(!user) return
  
  return (
    <div>
      <h3>{user.name}</h3>
      <h4>added blogs:</h4>
      {user.blogs.map((blog) => {
        return <p key ={blog.id}>{blog.title}</p>
      })}
    </div>
  );
};

export default UserInfo;
