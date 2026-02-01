import { useApolloClient, useQuery, useSubscription } from "@apollo/client/react";
import NewBook from "../components/NewBook";
import { ALL_BOOKS, BOOK_ADDED } from "../queries";
import { useState } from "react";
import GenreSelector from "./GenreSelector";
import { addBookToCache } from "../utils/apolloCache";
import BooksTable from "./BooksTable";

const Books = () => {
  const [genre, setGenre] = useState(null)
  const client = useApolloClient()

  

  const allBooksResult = useQuery(ALL_BOOKS)
  const booksResult = useQuery(ALL_BOOKS, {
    variables: {genre},
  })

  useSubscription(BOOK_ADDED, {
    onData: (data) => {
      const addedBook = data.data.bookAdded
      window.alert(`New book was added`)
      addBookToCache(client.cache, addedBook)

      booksResult.refetch()
    }
  })

  if(allBooksResult.loading || booksResult.loading)
    return (<h1>Books are loading...</h1>)

  const books = booksResult.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <NewBook/>
      <BooksTable books={books}/>
      <GenreSelector books={allBooksResult.data.allBooks} setGenre={setGenre}/>
    </div>
  )
}

export default Books
