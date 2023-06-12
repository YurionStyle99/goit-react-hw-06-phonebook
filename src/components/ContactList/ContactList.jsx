import React from 'react';
import PropTypes from 'prop-types';
import ContactListItem from './ContactListItem';

import { useSelector } from 'react-redux';

const ContactList = ({ contacts, onDeleteContact }) => {
  const filter = useSelector((state) => state.filter);

  const filteredContacts = contacts.filter((contact) =>
  contact.name && typeof contact.name === 'string' && contact.name.toLowerCase().includes(filter.toLowerCase())
);

  return (
    <ul>
      {filteredContacts.map(({ id, name, number }) => (
        <ContactListItem
          key={id}
          id={id}
          name={name}
          number={number}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );

}
export default ContactList;


ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};