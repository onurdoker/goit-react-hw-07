import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contactsSlice.js";
import Contacts from "../contact/Contacts.jsx";

import styles from "./ContactList.module.css";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  
  return (
      <div className={styles.body}>
        <ul>
          {filteredContacts.length === 0
              ? (<p>There are no available contacts!</p>)
              : filteredContacts.map((person) => (
                  <li key={person.id} className={styles.card}>
                    <Contacts contact={person} />
                  </li>
                ))
          }
        </ul>
      </div>
  );
};

export default ContactList;
