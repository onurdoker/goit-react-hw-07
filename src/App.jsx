import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ContactList from "./components/contactList/ContactList.jsx";
import { fetchContacts } from "./redux/contactsSlice.js";

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
              dispatch(fetchContacts());
            },
            [dispatch]);
  
  return (
      <div>
        <ContactList />
      </div>
  );
};

export default App;