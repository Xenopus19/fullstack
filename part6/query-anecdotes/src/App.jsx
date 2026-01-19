import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {getAll, updateAnecdote, addNew} from './services/anecdotesService'
import NotifyContext, { NotifyContextProvider } from './notificationContext'
import { useContext } from 'react'

const App = () => {
  const {notifyDispatch} = useContext(NotifyContext)
    const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['anecdotes']})
    },
  })
  
  const queryClient = useQueryClient()
  
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))
 
  if (result.isLoading) {
    return <div>loading data...</div>
  }
 
   if (result.status === 'error') {
    return <span>Anecdotes unreached due to server problems...</span>
  }
  const anecdotes = result.data


  const makeNotify = message => {
    notifyDispatch({type: 'SET', payload: message})
    setTimeout(()=>{notifyDispatch({type: 'RESET'})}, 5000)
  }

  const handleVote = (anecdote) => {
    makeNotify(`Voted for ${anecdote.content}`)
    voteMutation.mutate({...anecdote, votes: anecdote.votes+1})
  }

  return (
    <div>
      <Notification/>
      <h3>Anecdote app</h3>
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
