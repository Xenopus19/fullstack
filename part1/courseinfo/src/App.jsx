const Header = (props) =>{
    return (
        <h1>{props.headText}</h1>
    )
}

const Part = (props) =>{
    return(
        <p>
            {props.part} {props.exercise}
        </p>
    )
}

const Content = ({parts}) =>{
    return(
        <div>
            <Part part = {parts[0].name} exercise = {parts[0].exercises}/>
            <Part part = {parts[1].name} exercise = {parts[1].exercises}/>
            <Part part = {parts[2].name} exercise = {parts[2].exercises}/>
        </div>
    )
}

const Total = ({exersises}) =>{
    const total = exersises.reduce((acc, currentValue)=>acc+=currentValue, 0)
    return(
        <p>Number of exercises {total}</p>
    )
}

const App = () => {
    const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header headText = {course.name}/>
      <Content parts = {course.parts} />
      <Total exersises = {course.parts.map(value => value.exercises)}/>
    </div>
  )
}

export default App