import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchContacts",
    async () => {
      const response = await axios.get("https://6914df283746c71fe049e682.mockapi.io/contact");
      return response.data;
    },
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (contact) => {
      const response = await axios.post("https://6914df283746c71fe049e682.mockapi.io/contact", contact);
      return response.data;
    },
    {
      condition: (contact, { getState }) => {
        const contacts = getState().contacts.contacts;
        const exists = contacts.some(c => c.name.toLowerCase() === contact.name.toLowerCase());
        if (exists) {
          alert("Contact with this name already exists!");
          return false;
        }
      },
    },
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, { getState }) => {
      try {
        await axios.delete(`https://6914df283746c71fe049e682.mockapi.io/contact/${contactId}`);
        
        return contactId;
      } catch (error) {
        console.error("Failed to delete contact:", error);
        throw error;
      }
    },
    {
      condition: (contactId, { getState }) => {
        const contacts = getState().contacts.contacts;
        const exists = contacts.some(c => c.id === contactId);
        if (!exists) {
          alert("Contact does not exist!");
          return false;
        }
      },
    },
);

const contactsSlice = createSlice({
                                    name: "contacts",
                                    initialState: {
                                      contacts: [],
                                      status: "idle",
                                      error: null,
                                    },
                                    reducers: {},
                                    extraReducers: (builder) => {
                                      builder
                                          .addCase(fetchContacts.pending, (state) => {
                                            state.status = "loading";
                                          })
                                          .addCase(fetchContacts.fulfilled, (state, action) => {
                                            state.status = "succeeded";
                                            state.contacts = action.payload;
                                          })
                                          .addCase(fetchContacts.rejected, (state, action) => {
                                            state.status = "failed";
                                            state.error = action.error.message;
                                          })
                                          
                                          .addCase(addContact.pending, (state) => {
                                            state.status = "loading";
                                          })
                                          .addCase(addContact.fulfilled, (state, action) => {
                                            state.status = "succeeded";
                                            state.contacts.push(action.payload);
                                          })
                                          .addCase(addContact.rejected, (state, action) => {
                                            state.status = "failed";
                                            state.error = action.error.message;
                                          })
                                          
                                          .addCase(deleteContact.pending, (state) => {
                                            state.status = "loading";
                                          })
                                          .addCase(deleteContact.fulfilled, (state, action) => {
                                            state.status = "succeeded";
                                            const contactId = action.payload;
                                            state.contacts = state.contacts.filter(contact => contact.id !== contactId);
                                          })
                                          .addCase(deleteContact.rejected, (state, action) => {
                                            state.status = "failed";
                                            state.error = action.error.message;
                                          });
                                    },
                                  });

export const selectContacts = (state) => state.contacts.contacts;

export const selectFilteredContacts = (state) => {
  const { contacts } = state.contacts;
  const nameFilter = state.filters.name.toLowerCase();
  
  if (!nameFilter) {
    return contacts;
  }
  
  return contacts.filter(contact =>
                             contact.name.toLowerCase().includes(nameFilter),
  );
};

export default contactsSlice.reducer;
