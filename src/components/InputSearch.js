import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { debounceTime, distinctUntilChanged, fromEvent, map, tap } from 'rxjs';
import useHttp from '../hooks/use-http';
import { searchSuggestionsActions } from '../store/slices/search-suggestions-slice';
import { getMovieSearchSuggestions } from '../util/api';

const InputSearch = () => {
  const dispatch = useDispatch();
  const inputSearchRef = useRef('');

  const onClickSearchTermHandler = (e) => {
    e.stopPropagation();
    dispatch(searchSuggestionsActions.showSuggestions());
  };

  const { sendRequest } = useHttp(getMovieSearchSuggestions);

  const searchSuggestionsCalbback = useCallback(
    (mappedSuggestions) => {
      dispatch(searchSuggestionsActions.addSuggestions(mappedSuggestions));
    },
    [dispatch]
  );

  const searchHandler = (e) => {
    e.preventDefault();
  };

  const searchSuggestionsDispatchHandler = useCallback(
    (searchTerm) => {
      if (searchTerm.length < 3) {
        dispatch(searchSuggestionsActions.removeSuggestions());
      } else {
        sendRequest({}, searchTerm, searchSuggestionsCalbback);
      }
    },
    [dispatch, sendRequest, searchSuggestionsCalbback]
  );

  useEffect(() => {
    console.log('SUBSCRIBING');
    const inputSearch$ = fromEvent(inputSearchRef.current, 'input');
    inputSearch$
      .pipe(
        map((e) => e.target.value),
        debounceTime(400),
        distinctUntilChanged(),
        tap((searchTerm) => searchSuggestionsDispatchHandler(searchTerm))
      )
      .subscribe();
  }, [searchSuggestionsDispatchHandler]);

  return (
    <section className="min-w-full">
      <form onSubmit={searchHandler}>
        <input
          ref={inputSearchRef}
          id="newsInputSearch"
          type="search"
          placeholder="Movie title..."
          onClick={onClickSearchTermHandler}
          className="min-w-full font-teko placeholder:text-slate-200 h-14 text-2xl outline-0 border-0 border-b-2 border-solid border-black dark:bg-slate-400	dark:text-slate-200"
        />
      </form>
    </section>
  );
};

export default InputSearch;
