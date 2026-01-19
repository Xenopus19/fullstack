import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addNew } from '../services/anecdotesService'
import { useContext } from 'react'
import NotifyContext from '../notificationContext'

const AnecdoteForm = () => {
  const { notifyDispatch } = useContext(NotifyContext)
  const queryClient = useQueryClient()
  const addAnecdoteMutation = useMutation({
    mutationFn: addNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      notifyDispatch({ type: 'SET', payload: 'anecdote length must be 5 or more' })
      setTimeout(() => {
        notifyDispatch({ type: 'RESET' })
      }, 5000)
    },
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    addAnecdoteMutation.mutate(content)
    notifyDispatch({ type: 'SET', payload: `Added ${content}` })
    setTimeout(() => {
      notifyDispatch({ type: 'RESET' })
    }, 5000)
    event.target.anecdote.value = ''
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
