import { createSlice } from '@reduxjs/toolkit';
import { defaultTheme, themes } from '../../theme/themes';


const updateThemeVariables = (theme) => {
  document.documentElement.style.setProperty('--color-primary', theme.config.primary);
  document.documentElement.style.setProperty('--color-secondary', theme.config.secondary);
  document.documentElement.style.setProperty('--color-background', theme.config.background);
  document.documentElement.style.setProperty('--color-surface', theme.config.surface);
  document.documentElement.style.setProperty('--color-text', theme.config.text);
  document.documentElement.style.setProperty('--color-icon', theme.config.icon);
};

const initialState = {
  availableThemes: themes,
  currentTheme: defaultTheme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const theme = state.availableThemes.find(t => t.name === action.payload) || defaultTheme;
      state.currentTheme = theme;
      updateThemeVariables(theme);
    },
    initializeTheme: (state) => {
      updateThemeVariables(state.currentTheme);
    }
  }
});

export const { setTheme, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer;

// Selectors
export const selectCurrentTheme = state => state.theme.currentTheme;
export const selectAvailableThemes = state => state.theme.availableThemes;