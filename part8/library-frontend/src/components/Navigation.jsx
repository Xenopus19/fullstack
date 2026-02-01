import { Link } from "react-router-dom"

const Navigation = () => {
    return(
        <div>
            <Link to = '/authors'>Authors</Link>
            <Link to = '/books'>Books</Link>
            <Link to = '/user'>User</Link>
        </div>
    )
}

export default Navigation