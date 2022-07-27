import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SearchSuggestionItem from '../components/SearchSuggestions/SearchSuggestionItem';
import useHttp from '../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';
import { getAllMoviesForQuery } from '../util/api';

const AllSearchResults = () => {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const totalResults = parseInt(queryParams.get('r'), 10);
  const numOfPages = Math.min(Math.ceil(totalResults / 10), 10);
  const { q } = params;
  const {
    sendRequest,
    status,
    data: loadedMovies,
    error,
  } = useHttp(getAllMoviesForQuery, true);

  useEffect(() => {
    console.log('Loggin effect');
    sendRequest(q, {}, () => {}, numOfPages);
  }, [sendRequest, q, numOfPages]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'completed' && !error) {
    let mappedSearchSuggestions = [];
    let moviesId = [];
    loadedMovies.forEach((searchSuggestion) => {
      if (moviesId.indexOf(searchSuggestion.id !== -1)) {
        moviesId.push(searchSuggestion.id);

        mappedSearchSuggestions.push(
          <SearchSuggestionItem
            key={searchSuggestion.id}
            searchSuggestion={searchSuggestion}
          />
        );
      }
    });

    return (
      <div className="mt-12 overflow-hidden min-w-full w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {mappedSearchSuggestions}
      </div>
    );
  }

  if (status === 'completed' && error) {
    <p>An error has ocurred, please try again with a different term.</p>;
  }
};

export default AllSearchResults;
