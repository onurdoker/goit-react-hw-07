import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";
import contactsReducer from "./contactsSlice.js";
import filtersReducer from "./filtersSlice.js";

const persistConfig = {
  key: "contacts",
  storage,
  whitelist: ["items"],
};

const persistedContactReducer = persistReducer(persistConfig,
                                               contactsReducer);

const store = configureStore({
                               reducer: {
                                 contacts: persistedContactReducer,
                                 filters: filtersReducer,
                               },
                               middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
                             });

export const persistor = persistStore(store);

export default store;