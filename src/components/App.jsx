
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './styles.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { addContact, deleteContact } from './redux/contactSlice';
import { setFilter } from './redux/filterSlice';
import { saveContactsToLocalStorage, loadContactsFromLocalStorage } from '../components/redux/storage';

const App = () => {
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedContacts = loadContactsFromLocalStorage();
    dispatch(addContact(savedContacts));
  }, [dispatch]);

  useEffect(() => {
    saveContactsToLocalStorage(contacts);
  }, [contacts]);

  const handleFilterChange = (event) => {
    const filterValue = event.target.value.toLowerCase();
    dispatch(setFilter(filterValue));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter((contact) =>
    typeof contact.name === 'string' && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1>Name</h1>
      <ContactForm/>
      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;
