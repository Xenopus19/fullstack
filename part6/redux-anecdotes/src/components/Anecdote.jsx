const Anecdote = ({anecdote, onVoteChange}) => {
    const vote = id => {
        onVoteChange(id)
    }

    return (
        <>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </>
    )
}

export default Anecdote