import { useState } from 'react'
import './App.css'
import CountriesSearch from './components/CountriesSearch'
import axios from 'axios'
import { useEffect } from 'react'
import Countries from './components/Countries'

function App() {
  const [newSearch, setNewSearch] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(
        response => {
            setCountries(response.data)
        }
    )
  }, [newSearch])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  
  return (
    <>
    <CountriesSearch newSearch={newSearch} onSearchChange={handleSearchChange}/>
    <Countries countries={countries} search={newSearch}/>
    </>
  )
}

export default App
