const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
    const response = await fetch(baseUrl)

    if(!response.ok)
    {
        throw new Error('Failed to fetch anecdotes')
    }

    return await response.json()
}

export const addNew = async content => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({content, votes:0})
    })

    if(!response.ok){
        throw new Error('Failed to add anecdote')
    }
    return await response.json()
}

export const updateAnecdote = async newObject => {
    const response = await fetch(`${baseUrl}/${newObject.id}`, {
        method: 'PUT',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(newObject)
    })

    if(!response.ok){
        throw new Error('Failed to add anecdote')
    }
    return await response.json()
}

export default {getAll, addNew, updateAnecdote}