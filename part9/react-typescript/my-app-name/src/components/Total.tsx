import type { CoursePart } from "../types"

interface TotalProps{
    courseParts: CoursePart[]
}

const Total = ({courseParts}: TotalProps) => {
    const allExercises: number[] = courseParts.map(part => part.exerciseCount)
    return(<p>{allExercises.reduce((acc, part) => acc+=part)}</p>)
}

export default Total