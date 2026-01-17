import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
    const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    event.preventDefault();
    dispatch(filterChange(event.target.value))
  };

  return (
    <div>
      <label>filter
        <input placeholder="filter" onChange={handleFilterChange} />
      </label>
    </div>
  );
};

export default Filter;
