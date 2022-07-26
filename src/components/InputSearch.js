import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { debounceTime, distinctUntilChanged, fromEvent, map, tap } from 'rxjs';
import useHttp from '../hooks/use-http';
import { searchSuggestionsActions } from '../store/slices/search-suggestions-slice';
import { getMovieSearchSuggestions } from '../util/api';

const InputSearch = () => {
  const dispatch = useDispatch();
  const inputSearchRef = useRef('');
  const { sendRequest, data, error, status } = useHttp(
    getMovieSearchSuggestions
  );

  const searchHandler = (e) => {
    e.preventDefault();
    console.log('submitting');
  };

  const searchSuggestionsDispatchHandler = useCallback(
    (searchTerm) => {
      if (searchTerm.length < 3) {
        dispatch(searchSuggestionsActions.removeSuggestions());
      } else {
        sendRequest({}, searchTerm);
      }
    },
    [dispatch, sendRequest]
  );

  useEffect(() => {
    const inputSearch$ = fromEvent(inputSearchRef.current, 'input');
    inputSearch$
      .pipe(
        map((e) => e.target.value),
        debounceTime(400),
        distinctUntilChanged(),
        tap((searchTerm) => searchSuggestionsDispatchHandler(searchTerm))
      )
      .subscribe();

    return () => {
      inputSearch$.unsubscribe();
    };
  }, [searchSuggestionsDispatchHandler]);

  return (
    <section className='min-w-full'>
      <form onSubmit={searchHandler}>
        <input
          ref={inputSearchRef}
          id='newsInputSearch'
          type='search'
          placeholder='Movie title...'
          className='min-w-full h-9 outline-0 border-0 border-b-2 border-solid border-black text-lg mb-8 dark:bg-slate-400	dark:text-slate-200'
        />
      </form>
    </section>
  );
};

export default InputSearch;
