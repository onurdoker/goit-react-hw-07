import { useSelector } from "react-redux";

import { selectContacts } from "../../redux/contactsSlice.js";
import { selectNameFilter } from "../../redux/filtersSlice.js";
import Contacts from "../contact/Contacts.jsx";

import styles from "./ContactList.module.css";

const ContactList = () => {
  
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  
  const filteredContacts = contacts
      .filter((person) => person.name.toLowerCase()
                                .startsWith(filter))
      .sort((a,
             b) => a.name.localeCompare(b.name));
  
  
  return (
      <div className={styles.body}>
        <ul>
          {filteredContacts.length === 0
              ? (<p>There are no available contacts!</p>)
              : (filteredContacts.map((person) => (<div className={styles.card}>
                                        <Contacts
                                            key={person.id}
                                            contact={person}
                                        />
                                      </div>),
              ))}
        </ul>
      </div>
  );
  
};

export default ContactList;