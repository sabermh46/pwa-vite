import { createSlice } from '@reduxjs/toolkit';
import  categories  from '../../utils/activityCategories';

// Initialize IDs for existing items
const generateInitialState = () => {
    let availableActivityCount = 1;
    const processedCategories = categories.map(category => ({
      ...category,
      items: category.items.map(item => ({
        ...item,
        id: availableActivityCount++
      }))
    }));
  
    return {
      activityCategories: processedCategories,
      selectedItems: {},
      activeAchievements: [],
      availableActivityCount
    };
  };
  
const initialState = generateInitialState();
  

const dataSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    loadCategories: (state) => {
        if (!state.activityCategories || state.activityCategories.length === 0) {
          // Only reload categories if Redux state is empty
          const newState = generateInitialState();
          state.activityCategories = newState.activityCategories;
          state.availableActivityCount = newState.availableActivityCount;
        }
      },
    // Category CRUD
    addCategory: (state, action) => {
      state.activityCategories.push({
        ...action.payload,
        items: []
      });
    },
    resetData: (state) => {
      state.selectedItems = {}; // Clear selected items only
    },
    updateCategory: (state, action) => {
        const index = state.activityCategories.findIndex(
          c => c.name === action.payload.oldName
        );
        if (index !== -1) {
          state.activityCategories[index] = action.payload.updatedCategory;
        }
      },
      setSelectedItems: (state, action) => {
        state.selectedItems = action.payload; // Initializes selections
      },
      deleteCategory: (state, action) => {
        state.activityCategories = state.activityCategories.filter(
          c => c.name !== action.payload
        );
      },

    // Category Item CRUD with ID management
    addCategoryItem: (state, action) => {
      const { categoryName, item } = action.payload;
      const category = state.activityCategories.find(c => c.name === categoryName);
      
      if (category) {
        const newItem = {
          ...item,
          id: state.availableActivityCount
        };
        category.items.push(newItem);
        state.availableActivityCount++;
      }
    },

    // Other reducers remain similar but using IDs instead of names
    updateCategoryItem: (state, action) => {
      const { categoryName, itemId, newItem } = action.payload;
      const category = state.activityCategories.find(c => c.name === categoryName);
      if (category) {
        const itemIndex = category.items.findIndex(i => i.id === itemId);
        if (itemIndex !== -1) {
          category.items[itemIndex] = { 
            ...category.items[itemIndex], 
            ...newItem 
          };
        }
      }
    },

    deleteCategoryItem: (state, action) => {
      const { categoryName, itemId } = action.payload;
      const category = state.activityCategories.find(c => c.name === categoryName);
      if (category) {
        category.items = category.items.filter(i => i.id !== itemId);
      }
    },

    // Selection management using IDs
    toggleItemSelection: (state, action) => {
      const { itemId } = action.payload;
      console.log(itemId);
      
      state.selectedItems = {
        ...state.selectedItems,
        [itemId]: !state.selectedItems[itemId]
      };
    }
    

    // ... other reducers
  }
});

// Selectors
export const selectAllCategories = state => state.appData.activityCategories;
export const selectItemById = (state, itemId) => {
  for (const category of state.appData.activityCategories) {
    const item = category.items.find(i => i.id === itemId);
    if (item) return item;
  }
  return null;
};

export const { 
    loadCategories,
    resetData,
  addCategory,
  setSelectedItems,
  updateCategory,
  deleteCategory,
  addCategoryItem,
  updateCategoryItem,
  deleteCategoryItem,
  toggleItemSelection
} = dataSlice.actions;

export default dataSlice.reducer;