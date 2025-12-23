import Header from "./Header"

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
            {parts.map(part => 
                <Part key = {part.exercises} part = {part.name} exercise = {part.exercises}/>
            )}
        </div>
    )
}

const Total = ({exersises}) =>{
    const total = exersises.reduce((acc, currentValue)=>acc+=currentValue, 0)
    return(
    <strong>Number of exercises {total}</strong>
    )
}

const Course = ({course}) => {

    
    return (
    <div>
      <Header headText = {course.name}/>
      <Content parts = {course.parts} />
      <Total exersises = {course.parts.map(value => value.exercises)}/>
    </div>
  )
}
export default Course