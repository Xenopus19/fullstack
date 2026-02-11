import type { CoursePart } from "../types"

interface PartProps{
    coursePart: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({coursePart}: PartProps) => {
    switch(coursePart.kind){
        case 'background':
            return(<p>{coursePart.name} Background material: {coursePart.backgroundMaterial} Description: {coursePart.description} Exercises: {coursePart.exerciseCount}</p>)
        case 'basic':
            return(<p>{coursePart.name} Description: {coursePart.description} Exercises: {coursePart.exerciseCount}</p>)    
        case 'group':
            return(<p>{coursePart.name} Group Project count: {coursePart.groupProjectCount} Exercises: {coursePart.exerciseCount}</p>)
        case 'special':
            return(<p>{coursePart.name} Description: {coursePart.description} Required: {coursePart.requirements} Exercises: {coursePart.exerciseCount}</p>)            
        default:
            return assertNever(coursePart)
    }
}

export default Part