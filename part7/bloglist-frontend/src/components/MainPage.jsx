import { useDispatch, useSelector } from "react-redux";
import Toggleable from "./Toggleable";
import CreateBlog from "./CreateBlog";
import { Link } from "react-router-dom";

const MainPage = ({ handleCreateBlog, createBlogRef }) => {
  const blogs = useSelector((state) => state.blogs);

  const getSortedBlogs = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    return sortedBlogs;
  };

  const blogList = () => {
    return (
      <>
        <h2>blogs</h2>
        {getSortedBlogs().map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        ))}
      </>
    );
  };

  return (
    <div>
      <Toggleable buttonLabel="Create blog" ref={createBlogRef}>
        <CreateBlog submitBlog={handleCreateBlog}></CreateBlog>
      </Toggleable>
      {blogList()}
    </div>
  );
};

export default MainPage;
