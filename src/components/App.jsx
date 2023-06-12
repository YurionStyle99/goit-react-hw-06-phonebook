
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid/non-secure';
import styles from './styles.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { addContact, deleteContact } from './redux/contactSlice';
import { saveContactsToLocalStorage, loadContactsFromLocalStorage } from '../components/redux/storage';

const App = () => {
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
console.log(contacts)
  useEffect(() => {
    const savedContacts = loadContactsFromLocalStorage();
    savedContacts.forEach((contact) => dispatch(addContact(contact.name, contact.number)));
  }, [dispatch]);

  useEffect(() => {
    saveContactsToLocalStorage(contacts);
  }, [contacts]);
  const handleAddContact = (name, number) => {
    const id = nanoid();
    const newContact = { id, name, number };
  
    const isNameExist = contacts.find(
      (contact) => typeof contact.name === 'string' && contact.name.toLowerCase() === name.toLowerCase()
    );
  
    if (isNameExist) {
      alert(`${name} alerady uses in contacts`);
      return;
    }
  
    dispatch(addContact(newContact));
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
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter />
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;