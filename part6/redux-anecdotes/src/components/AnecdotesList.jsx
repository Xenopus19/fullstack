import { useDispatch, useSelector } from "react-redux";
import Anecdote from "./Anecdote";
import { changeAnecdote } from "../reducers/anecdoteReducer";
import {
  clearNotification,
  makeNotification,
  setNotification,
} from "../reducers/notificationReducer";




const AnecdotesList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const getAnecdotesToRender = () => {
    const filtered = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().startsWith(filter.toLowerCase())
    );
    return filtered.sort((a, b) => b.votes - a.votes);
  };

  const handleVoteChange = (id) => {
    const anecdote = anecdotes.filter((anecdote) => anecdote.id === id)[0];
    dispatch(changeAnecdote({...anecdote, votes: anecdote.votes+1}));
    dispatch(makeNotification(`You have voted for ${anecdote.content}`))
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      {getAnecdotesToRender().map((anecdote) => {
        return (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            onVoteChange={handleVoteChange}
          ></Anecdote>
        );
      })}
    </div>
  );
};

export default AnecdotesList;
