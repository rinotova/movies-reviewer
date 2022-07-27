import { createSlice } from '@reduxjs/toolkit';

const initialSearchSuggestionsState = {
  searchSuggestions: [],
  searchTerm: '',
  totalResults: 0,
  showSuggestions: true,
};

const searchSuggestions = createSlice({
  name: 'searchSuggestions',
  initialState: initialSearchSuggestionsState,
  reducers: {
    addSuggestions(state, action) {
      const { mappedSuggestions, totalResults, q } = action.payload;
      state.searchSuggestions = mappedSuggestions;
      state.searchTerm = q;
      state.totalResults = totalResults;
    },
    removeSuggestions(state) {
      state.searchSuggestions = [];
      state.searchTerm = '';
      state.totalResults = 0;
    },
    showSuggestions(state) {
      state.showSuggestions = true;
    },
    hideSuggestions(state) {
      state.showSuggestions = false;
    },
  },
});

export const searchSuggestionsActions = searchSuggestions.actions;
export default searchSuggestions.reducer;
