import { useSelector } from 'react-redux';
import SearchSuggestionItem from './SearchSuggestionItem';
import store from '../../store';
import { Link } from 'react-router-dom';

const SearchSuggestions = () => {
  const searchSuggestionsState = store.getState().searchSuggestions;
  const { searchTerm, totalResults } = searchSuggestionsState;

  const searchSuggestions = useSelector(
    (state) => state.searchSuggestions.searchSuggestions
  );

  const showSuggestions = useSelector(
    (state) => state.searchSuggestions.showSuggestions
  );

  if (searchSuggestions.length === 0 || !showSuggestions) {
    return;
  }

  let mappedSearchSuggestions = [];
  let moviesId = [];
  searchSuggestions.forEach((searchSuggestion) => {
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
    <div className=" max-h-96 overflow-scroll min-w-full w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {mappedSearchSuggestions}
      {totalResults > 10 && (
        <Link to={`/all-movie-results/${searchTerm}?r=${totalResults}`}>
          <p className="ml-4 my-4 text-xl">
            See all results for: "{searchTerm}"
          </p>
        </Link>
      )}
    </div>
  );
};

export default SearchSuggestions;
