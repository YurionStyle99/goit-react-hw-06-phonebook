import React, { useState } from "react";
import styles from "../styles.module.css";
import {  useSelector } from 'react-redux';
import { nanoid } from 'nanoid/non-secure';

const ContactForm = ({ handleAddContact }) => {
  const contacts = useSelector((state) => state.contacts);
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
    const id = nanoid();
    const newContact = { id, name, number };

    const isNameExist = contacts.find(
      (contact) => typeof contact.name === 'string' && contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameExist) {
      alert(`${name} is already in contacts`);
      return;
    }

    handleAddContact(newContact);
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
