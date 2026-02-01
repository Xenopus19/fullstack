const GenreSelector = ({ books, setGenre }) => {
  const genres = [...new Set(books.flatMap((b) => b.genres))];
  return (
    <div>
      <h3>Select genre:</h3>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre(null)}>
          All books
        </button>
    </div>
  );
};

export default GenreSelector;
