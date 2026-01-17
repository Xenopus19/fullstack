import { createSlice } from "@reduxjs/toolkit"
import { retry } from "@reduxjs/toolkit/query"
import anecdoteService from "../services/anecdoteService"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState, 
  reducers:{
    changeExisting(state, action){
      return state.map(anecdote => anecdote.id===action.payload.id ? action.payload : anecdote)
    },
    addAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addNew = (content) => {
  return async (dispatch) => {
    const added = await anecdoteService.addNew(content)
    dispatch(addAnecdote(added))
  }
}

export const changeAnecdote = (newAnecdote) => {
  return async (dispatch) => {
    const changed = await anecdoteService.updateAnecdote(newAnecdote)
    dispatch(changeExisting(changed))
  }
}

export const { changeExisting, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
