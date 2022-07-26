import { createSlice } from '@reduxjs/toolkit';

const initialUseFetchControllerSliceState = {
  controller: new AbortController(),
};

const useFetchController = createSlice({
  name: 'useFetchController',
  initialState: initialUseFetchControllerSliceState,
  reducers: {
    setController(state, action) {
      state.controller = action.payload;
    },
  },
});

export const useFetchControllerActions = useFetchController.actions;
export default useFetchController.reducer;
