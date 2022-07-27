import { useSelector } from 'react-redux';
import SearchSuggestionItem from './SearchSuggestionItem';

const SearchSuggestions = (props) => {
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
    </div>
  );
};

export default SearchSuggestions;
