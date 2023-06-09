import React from "react";
import PropTypes from 'prop-types';
import styles from "../styles.module.css";

const Filter = ({ filter, handleFilterChange }) => {
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
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};
