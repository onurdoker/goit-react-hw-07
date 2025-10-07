import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { selectContacts, addContact } from "../../redux/contactsSlice.js";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const nameId = useId();
  const numberId = useId();
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  
  const FeedbackSchema = Yup.object()
                            .shape({
                                     name: Yup.string()
                                              .min(3,
                                                   "Name must be at least 3 characters long")
                                              .max(50,
                                                   "Name must be maximum 50 character long")
                                              .matches(/^[A-Za-zĞÜŞİÖÇğüşıöç\s]+$/,
                                                       "Name must contain only letters")
                                              .required("Name is required"),
                                     number: Yup.string()
                                                .matches(/^\d{7}$/,
                                                         "The phone number must contain exactly 7 digits" +
                                                         " (for example: 1234567)")
                                                .required("Phone number is required"),
                                   });
  
  function capitalize(name) {
    if (name.includes(" ")) {
      let count = 0;
      for (let char of name) {
        if (char === " ") {
          count += 1;
        }
      }
      
      let namee = [];
      let newName = "";
      
      for (let i = 0; i <= count; i++) {
        namee[i] = name.split(" ")[i];
        namee[i] = namee[i].charAt(0)
                           .toUpperCase() + namee[i].slice(1);
        
        newName = `${newName} ${namee[i]}`.trim();
      }
      
      return newName;
    } else {
      return name.charAt(0)
                 .toUpperCase() + name.slice(1);
    }
  }
  
  function reOrganizeNumber(phoneNumber) {
    return phoneNumber.slice(0,
                             3) + "-" + phoneNumber.slice(3,
                                                          5) + "-" + phoneNumber.slice(5);
  }
  
  const handleSubmit = (values,
                        { resetForm }) => {
    const capitalizedName = capitalize(values.name);
    
    const exists = contacts.some((c) => c.name.toLowerCase() === capitalizedName.toLowerCase());
    if (exists) {
      alert("Contact with this name already exists!");
      return;
    }
    
    const formattedNumber = reOrganizeNumber(values.number);
    
    dispatch(addContact(capitalizedName,
                        formattedNumber));
    resetForm();
  };
  
  return (
      <Formik
          initialValues={{
            name: "",
            number: "",
          }}
          validationSchema={FeedbackSchema}
          onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <div className={styles.name}>
            <label htmlFor={nameId}>Name: </label>
            <Field
                className={styles.searchField}
                type="text"
                name="name"
                id={nameId}
            />
            <ErrorMessage
                className={styles.error}
                name={"name"}
                component={"span"}
            />
          </div>
          
          <div className={styles.name}>
            <label htmlFor={numberId}>Number: </label>
            <Field
                className={styles.searchField}
                type={"phone"}
                name={"number"}
                id={numberId}
            />
            <ErrorMessage
                className={styles.error}
                name={"number"}
                component={"span"}
            />
          </div>
          
          <div className={styles.name}>
            <button
                className={styles.btn}
                type={"submit"}
            >Add Contact
            </button>
          </div>
        </Form>
      
      </Formik>
  );
  
};
export default ContactForm;