const CountriesSearch = ({newSearch, onSearchChange}) => {
    return (
        <>
        <p>find countries</p>
        <input value={newSearch} onChange={onSearchChange}></input>
        </>
    )
}

export default CountriesSearch