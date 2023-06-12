import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid/non-secure';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(contact) {
        return { payload: { id: nanoid(), ...contact } };
      },
    },
    deleteContact(state, action) {
      return state.filter((contact) => contact.id !== action.payload);
    },
  },
});


export const { addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;