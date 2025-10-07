import { useDispatch } from "react-redux";
import { IoPersonSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { deleteContact } from "../../redux/contactsSlice.js";

import styles from "./Contacts.module.css";

const Contacts = ({ contact }) => {
  const dispatch = useDispatch();
  
  return (
      <>
        <li>
          <IoPersonSharp /> {contact.name} <br />
          <FaPhone /> {contact.number}
        </li>
        <button
            className={styles.btn}
            onClick={() => dispatch(deleteContact(contact.id))}
        >
          Delete
        </button>
      </>
  );
};

export default Contacts;