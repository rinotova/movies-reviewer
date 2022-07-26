import { configureStore } from '@reduxjs/toolkit';
import searchSuggestionsReducer from './slices/search-suggestions-slice';
import selectedMovieReducer from './slices/selected-movie-slice';
import useFetchControllerReducer from './slices/fetch-controller-slice';

const store = configureStore({
  reducer: {
    searchSuggestions: searchSuggestionsReducer,
    selectedMovie: selectedMovieReducer,
    useFetchController: useFetchControllerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
