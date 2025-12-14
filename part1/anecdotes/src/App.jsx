import { useState } from 'react'
import './App.css'

const Button = ({text, clickHandler}) => <button onClick={clickHandler}>{text}</button>

function getRandomArbitrary(min, max) {
  return Math.trunc(Math.random() * (max - min) + min);
}

const AnecdoteWithVotes = ({anecdotes, votes, index}) => {
    return(
        <>
         {anecdotes[index]}
         <br/>
         <p>has {votes[index]} votes</p>
        </>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleNextAnecdote = () => {
    const nextRandom = getRandomArbitrary(0, anecdotes.length-1)
    console.log(nextRandom)
    setSelected(nextRandom)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  const getMostVotesIndex = () => {
    let mostIndex = 0
    for(let i = 0; i < votes.length; i++)
    {
        if(votes[i]>votes[mostIndex])
            mostIndex = i;
    }
    return mostIndex
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdoteWithVotes anecdotes={anecdotes} votes={votes} index={selected}/>
      <br/>
      <Button text = "next anecdote" clickHandler={handleNextAnecdote}/>
      <Button text = "vote" clickHandler={handleVote}/>
      <h1>Anecdote with most votes</h1>
      <AnecdoteWithVotes anecdotes={anecdotes} votes={votes} index={getMostVotesIndex()}/>
    </div>
  )
}

export default App
