import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';
import appData from "./features/db/categoryData"
import themeReducer from "./features/theme/themeSlices"
import journalReducer from "./features/journal/journalSlice"

const persistConfig = {
  key: 'root',
  storage: storage('pulse-journal-db'),
  version: 1,
  serialize: true, // Add explicit serialization
  deserialize: true // Add explicit deserialization
};

const rootReducer = combineReducers({
    appData: appData,
    theme: themeReducer,
    journal: journalReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['journal.entries'], // Add if using Date objects
        warnAfter: 100
      }
    }),
});

export const persistor = persistStore(store);