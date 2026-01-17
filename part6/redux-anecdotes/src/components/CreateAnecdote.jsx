import { useDispatch } from "react-redux";
import { addAnecdote, addNew } from "../reducers/anecdoteReducer";
import { makeNotification, setNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdoteService";

const CreateAnecdote = () => {
  const dispatch = useDispatch();

  const handleCreateAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value
    dispatch(addNew(content));
    dispatch(makeNotification(`Anecdote ${content} created`))
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateAnecdote;
