import { useSelector } from "react-redux";

import { selectFilteredContacts } from "../../redux/contactsSlice.js";

import styles from "./ContactList.module.css";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  
  return (
      <div className={styles.body}>
        <ul>
          {filteredContacts.length === 0
              ? (<p>There are no available contacts!</p>)
              : (filteredContacts.map((person) => (
                  <div
                      key={person.id}
                      className={styles.card}
                  >
                    
                    <p><strong>Name:</strong> {person.name}</p>
                    <p><strong>Number:</strong> {person.phone}</p>
                  </div>
              )))
          }
        </ul>
      </div>
  );
};

export default ContactList;
