import reviewer from '../../img/reviewer.png';
import { useNavigate } from 'react-router-dom';

const SearchSuggestionItem = (props) => {
  const navigate = useNavigate();
  const { searchSuggestion } = props;

  const searchSuggestionClickHandler = () => {
    navigate(`/movies/${searchSuggestion.id}`);
  };

  return (
    <button
      type="button"
      onClick={searchSuggestionClickHandler}
      className="sm:min-h-[193px] py-2 px-4 w-full font-medium text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
    >
      <div className="flex">
        {searchSuggestion.poster !== 'N/A' && (
          <img
            className="mr-4 h-44 w-28 md:h-64 md:w-44 shrink-0"
            src={searchSuggestion.poster}
            loading="lazy"
            alt={searchSuggestion.title}
            height="auto"
            width="auto"
          />
        )}
        {searchSuggestion.poster === 'N/A' && (
          <div className="flex items-center border border-1 border-gray-400 justify-center text-center mr-4 h-44 w-28 md:h-64 md:w-44 shrink-0">
            <img
              src={reviewer}
              className="h-20 w-20"
              alt="Reviewer"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex flex-col font-teko text-xl md:text-4xl">
          <p>{searchSuggestion.title}</p>
          <p>{searchSuggestion.year}</p>
        </div>
      </div>
    </button>
  );
};

export default SearchSuggestionItem;
