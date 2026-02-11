import type { CoursePart } from "../types"
import Part from "./Part"

interface ContentProps{
    courseParts: CoursePart[]
}

const Content = ({courseParts}: ContentProps) => {
    return(<>
    {courseParts.map(part => <Part coursePart={part}/>)}
    </>)
}

export default Content