import { useEffect, useState } from 'react'
import './App.css'
import Person from './components/Person'
import AddNew from './components/AddNew'
import SearchFilter from './components/SearchFilter' 
import personsService from './services/persons'
import Message from './components/Message'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(()=>{
    personsService.getAll().then(
        data => setPersons(data)
    )
  }, [])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [newMessage, setNewMessage] = useState({
    message : "",
    isError : false
  })

  const handleNameChange = (event) =>
  {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) =>
  {
    setNewPhone(event.target.value)
  }

  const handleSearchChange = (event) =>
  {
    setNewSearch(event.target.value)
  }

  const checkValidName = (name) =>{
    if(name === "") return false

    return true
  }

  const getPersonsToShow = () =>{
    if(newSearch === '') return persons
    return persons.filter(person => person.name.toLowerCase().startsWith(newSearch))
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    if(!checkValidName(newName)){
        alert(`Invalid name`)
        setNewName("")
        return
    }
    const existing = persons.filter(person => person.name === newName)
    if(existing.length!=0)
    {
        if(!window.confirm(`Do you want to update ${newName}'s phone?`)) return

        updatePersonInfo(existing[0])
        return
    }

    const newPerson = {name: newName, number: newPhone, id: persons.at(-1).id + 1}
    personsService.create(newPerson).then(data => {
        setPersons(persons.concat(data))
        setNewName("")
        setNewPhone('')
        setNewMessage({message: "New person added", isError: false})
        setTimeout(()=>setNewMessage({message:'', isError: false}), 5000)
    }
    )
  }

  const updatePersonInfo = (person) => {
    const newPerson = {...person, number: newPhone}
    personsService.update(person.id, newPerson).then(
        data => {
            const newPersons = persons.map(p => p.id === data.id ? data : p)
            setPersons(newPersons)
            setNewName("")
            setNewPhone("")
        }
    ).catch(() => {
        setNewMessage({message: "The person is already deleted", isError: true})
        setTimeout(() => setNewMessage({message:'', isError:false}), 5000)
    })
  } 

  const handleDeletePerson = (id) => {
    if(!window.confirm("Do you want to delete person?")) return
    personsService.deleteObject(id).then(
        data => {
            const newPersons = persons.filter(person => person.id !== id)
            console.log(persons)
            setPersons(newPersons)
        }
    )
  }
  return (
    <div>
      <Message message={newMessage.message} isError={newMessage.isError}/>
      <h2>Phonebook</h2>
      <SearchFilter handleSearchChange={handleSearchChange} newSearch={newSearch}/>
      <h2>Add a new</h2>
      <AddNew handleAddPerson = {handleAddPerson} handleNameChange = {handleNameChange} handlePhoneChange = {handlePhoneChange} newName = {newName} newPhone = {newPhone}/>
      <h2>Numbers</h2>
      {getPersonsToShow().map((person) => <Person key = {person.id} person = {person} deletePerson={() => handleDeletePerson(person.id)}></Person>)}
    </div>
  )
}

export default App
