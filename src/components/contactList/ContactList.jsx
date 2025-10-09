import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contactsSlice.js";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  return (
      <ul>
        {filteredContacts.map((contact) => (
            <li key={contact.id}>{contact.name}</li>
        ))}
      </ul>
  );
};

export default ContactList;