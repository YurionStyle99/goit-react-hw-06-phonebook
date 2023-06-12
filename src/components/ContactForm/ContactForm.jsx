import React, { useState } from "react";
import PropTypes from 'prop-types';
import styles from "../styles.module.css";
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/contactSlice';

const ContactForm = ({onAddContact}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    onAddContact( name, number ); // Передайте объект контакта
    setName('');
    setNumber('');
  };

    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
          className={styles.input}
          required
        />
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleNumberChange}
          placeholder="Phone number"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Add to contacts
        </button>
      </form>
    );
}

export default ContactForm;

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
