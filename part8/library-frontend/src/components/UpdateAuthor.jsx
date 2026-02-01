import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const UpdateAuthor = ({ authors }) => {
  const [name, setName] = useState(authors[0].name);
  const [born, setBorn] = useState(0);

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const updateBorn = (event) => {
    event.preventDefault();

    updateAuthor({ variables: { name, setBornTo: parseInt(born) } });

    setBorn(0);
    setName("");
  };

  return (
    <div>
      <h3>Update author born year</h3>
      <form onSubmit={updateBorn}>
        <label>
          Author Name
          <select value={name} onChange={({target}) => setName(target.value)}>
            {authors.map(author => <option key={author.id} value={author.name}>{author.name}</option>)}
          </select>
        </label>
        <br />
        <label>
          New born year
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            placeholder="birth year"
          />
        </label>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default UpdateAuthor;
