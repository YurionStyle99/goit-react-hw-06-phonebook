import React from "react";
import PropTypes from 'prop-types';
import styles from "../styles.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <label className={styles.label}>
      Find contacts by name
      <input
        className={styles.input}
        type="text"
        value={filter}
        placeholder="Name"
        onChange={handleFilterChange}
      />
    </label>
  );
}


export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};