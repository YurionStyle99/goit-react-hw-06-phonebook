import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';


import contactsReducer from './contactSlice';
import filterReducer from './filterSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);
export const saveContactsToLocalStorage = (contacts) => {
  const contactIds = contacts.map((contact) => contact.id);
  window.localStorage.setItem('contactIds', JSON.stringify(contactIds));
};

export const loadContactsFromLocalStorage = () => {
  const contactIds = JSON.parse(window.localStorage.getItem('contactIds')) || [];
  return contactIds.map((id) => ({
    id,
    name: '',
    number: '',
  }));
};
const middleware = [...getDefaultMiddleware({ serializableCheck: false })];

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor = persistStore(store);
