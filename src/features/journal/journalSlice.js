import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entries: [],
  lastId: 0 // Keeps track of the last assigned ID
};

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    saveJournalEntry: (state, action) => {
      const newEntry = {
        ...action.payload,
        id: state.lastId + 1 // Assigns a new serialized ID
      };
      state.entries.push(newEntry);
      state.lastId += 1; // Updates the last assigned ID
    },
    deleteJournalEntry: (state, action) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
    updateJournalEntry: (state, action) => {
      const index = state.entries.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = { ...state.entries[index], ...action.payload.updatedData };
      }
    }
  }
});

// **Selector to get all saved journal entries**
export const getSavedJournal = (state) => state.journal?.entries || [];

export const { saveJournalEntry, deleteJournalEntry, updateJournalEntry } = journalSlice.actions;
export default journalSlice.reducer;
