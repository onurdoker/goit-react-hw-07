import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchContacts } from "./redux/contactsSlice";
import ContactForm from "./components/contactForm/ContactForm.jsx";
import ContactList from "./components/contactList/ContactList.jsx";
import SearchBox from "./components/searchBox/SearchBox.jsx";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  
  return (
      <div>
        <h1>Phonebook</h1>
        <div>
          <ContactForm />
          <SearchBox />
          <ContactList />
        </div>
      </div>
  );
}

export default App;
