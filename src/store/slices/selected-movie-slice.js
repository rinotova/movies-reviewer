import { createSlice } from '@reduxjs/toolkit';

const initialSelectedMovieState = {
  selectedBook: {},
};

const selectedMovie = createSlice({
  name: 'selectedBook',
  initialState: initialSelectedMovieState,
  reducers: {
    updateSelectedMovie(state, action) {
      state.selectedBook = { ...action.payload };
    },
  },
});

export const selectedMovieActions = selectedMovie.actions;
export default selectedMovie.reducer;
