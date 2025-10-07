import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeFilter, selectNameFilter } from "../../redux/filtersSlice.js";

import styles from "./SearchBox.module.css";

const SearchBox = () => {
  
  const nameId = useId();
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);
  
  const handleSearchChange = (event) => {
    const value = event.target.value;
    dispatch(changeFilter(value));
  };
  
  return (
      <div className={styles.search}>
        <label htmlFor={nameId}>Find contact by name</label>
        <input
            type={"text"}
            value={filter}
            onChange={handleSearchChange}
            id={nameId}
        />
      </div>
  );
};

export default SearchBox;