import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  
  const handleDelete = (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      dispatch(deleteContact(contactId));
    }
  };
  
  return (
      <div>
        <h2>Contact List</h2>
        {contacts.length === 0 ? (
            <p>No contacts available.</p>
        ) : (
            contacts.map(contact => (
                <div
                    key={contact.id}
                    className="contact-item"
                >
                  <p><strong>Name:</strong> {contact.name}</p>
                  <p><strong>Number:</strong> {contact.phone}</p>
                  <button
                      onClick={() => handleDelete(contact.id)}
                      disabled={contacts.length === 1}
                  >
                    Delete
                  </button>
                </div>
            ))
        )}
      </div>
  );
};

export default Contacts;