import { configureStore } from '@reduxjs/toolkit';
import searchSuggestionsReducer from './slices/search-suggestions-slice';
import useFetchControllerReducer from './slices/fetch-controller-slice';

const store = configureStore({
  reducer: {
    searchSuggestions: searchSuggestionsReducer,
    useFetchController: useFetchControllerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
