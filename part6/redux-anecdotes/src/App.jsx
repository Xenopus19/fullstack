import { useDispatch, useSelector } from 'react-redux'
import AnecdotesList from './components/AnecdotesList'
import CreateAnecdote from './components/CreateAnecdote'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import anecdoteService from './services/anecdoteService'
import { initAnecdotes, setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initAnecdotes())
  },[dispatch])

  return (
    <div>
      <Notification></Notification>
      <Filter></Filter>
      <AnecdotesList></AnecdotesList>
      <CreateAnecdote></CreateAnecdote>
    </div>
  )
}

export default App
