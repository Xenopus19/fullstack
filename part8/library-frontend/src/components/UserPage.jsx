import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS } from "../queries"
import BooksTable from "./BooksTable"

const UserPage = ({currentUser}) => {
    if(!currentUser)
        return (<h1>User is not logged in</h1>)

    const booksResult = useQuery(ALL_BOOKS, {
        variables: {genre: currentUser.favoriteGenre}
    })

    if(booksResult.loading)
        return (<h1>Loading...</h1>)
    
    const recBooks = booksResult.data.allBooks

    return(
        <div>
            <h3>{currentUser.username}</h3>
            <h3>Recommended books for genre {currentUser.favoriteGenre}</h3>
            <BooksTable books={recBooks}/>
        </div>
    )
}

export default UserPage