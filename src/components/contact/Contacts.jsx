import React from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import { IoPersonSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";

import styles from "./Contacts.module.css";

const Contacts = ({ contact }) => {
  const dispatch = useDispatch();
  
  const handleDelete = (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      dispatch(deleteContact(contactId));
    }
  };
  
  return (
      <>
        <li>
          <IoPersonSharp /> {contact.name} <br />
          <FaPhone /> {contact.phone}
        </li>
        <button
            className={styles.btn}
            onClick={() => handleDelete(contact.id)}
        >
          Delete
        </button>
      </>
  );
};

export default Contacts;