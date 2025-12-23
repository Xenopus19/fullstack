const SearchFilter = ({newSearch, handleSearchChange}) =>{
    return(
        <div>
          search by name: <input value = {newSearch} onChange = {handleSearchChange} />
        </div>
    )
}

export default SearchFilter