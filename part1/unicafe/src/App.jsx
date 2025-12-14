import { useState } from 'react'
import './App.css'

const Button = ({text, clickHandler}) => <button onClick={clickHandler}>{text}</button>

const StatisticLine = ({text, value}) =>{
    return(
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) =>{
    if(good+neutral+bad<=0)
    {
        return (
            <p>No feedback given</p>
        )
    }
    return (
        <table>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="average" value={(good-bad)/(good+bad+neutral)}/>
        <StatisticLine text="positive" value={((good)/(good+bad+neutral))*100+"%"}/>
        </table>
    )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" clickHandler = {()=>setGood(good+1)}></Button>
      <Button text="neutral" clickHandler = {()=>setNeutral(neutral+1)}></Button>
      <Button text="bad" clickHandler = {()=>setBad(bad+1)}></Button>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App
