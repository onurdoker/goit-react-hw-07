import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

import contactsReducer, { selectContacts, addContact } from "../../redux/contactsSlice.js";

const ContactForm = () => {
  const nameId = useId();
  const numberId = useId();
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  
  const FeedbackSchema = Yup.object()
                            .shape({
                                     name: Yup.string()
                                              .min(3, "Name must be at least 3 characters long")
                                              .max(50, "Name must be maximum 50 characters long")
                                              .matches(/^[A-Za-zĞÜŞİÖÇğüşıöç\s]+$/, "Name must contain only letters")
                                              .required("Name is required"),
                                     number: Yup.string()
                                                .matches(/^\d{7}$/, "The phone number must contain exactly 7 digits (for example: 1234567)")
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
  
  const handleSubmit = (values, { resetForm }) => {
    const capitalizedName = capitalize(values.name);
    
    const exists = contacts.some((c) => c.name.toLowerCase() === capitalizedName.toLowerCase());
    if (exists) {
      alert("Contact with this name already exists!");
      return;
    }
    
    dispatch(addContact({
                          name: capitalizedName,
                          phone: values.number,
                        }));
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
        {({
            touched,
            errors,
          }) => (
            <Form className="contact-form">
              <div>
                <label htmlFor={nameId}>Name:</label>
                <Field
                    type="text"
                    name="name"
                    id={nameId}
                    placeholder="Enter Name"
                />
                {touched.name && errors.name ? (
                    <ErrorMessage
                        component="div"
                        name="name"
                        className="error"
                    />
                ) : null}
              </div>
              
              <div>
                <label htmlFor={numberId}>Number:</label>
                <Field
                    type="text"
                    name="number"
                    id={numberId}
                    placeholder="Enter Number"
                />
                {touched.number && errors.number ? (
                    <ErrorMessage
                        component="div"
                        name="number"
                        className="error"
                    />
                ) : null}
              </div>
              
              <button type="submit">Add Contact</button>
            </Form>
        )}
      </Formik>
  );
};

export default ContactForm;