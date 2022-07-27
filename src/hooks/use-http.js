import { useReducer, useCallback } from 'react';
import { useFetchControllerActions } from '../store/slices/fetch-controller-slice';
import store from '../store';

function httpReducer(state, action) {
  if (action.type === 'SEND') {
    return {
      data: null,
      error: null,
      status: 'pending',
    };
  }

  if (action.type === 'SUCCESS') {
    return {
      data: action.responseData,
      error: null,
      status: 'completed',
    };
  }

  if (action.type === 'ERROR') {
    return {
      data: null,
      error: action.errorMessage,
      status: 'completed',
    };
  }

  return state;
}

function useHttp(requestFunction, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? 'pending' : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (
      requestData,
      q,
      postProcessCallback = (responseJson) => responseJson
    ) {
      dispatch({ type: 'SEND' });
      try {
        // Abort previous ongoing request and set a new abort controller
        const controller = store.getState().useFetchController.controller;
        controller.abort();
        let newController = new AbortController();
        let signal = newController.signal;
        dispatch(useFetchControllerActions.setController(newController));

        // Send request
        const responseData = await requestFunction(
          { ...requestData, signal },
          q
        );
        dispatch({ type: 'SUCCESS', responseData });
        postProcessCallback(responseData);
      } catch (error) {
        console.log(error);
        dispatch({
          type: 'ERROR',
          errorMessage: error.message || 'Something went wrong!',
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
