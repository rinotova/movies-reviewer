import { Fragment } from 'react';
import InputSearch from '../components/InputSearch';
import SearchSuggestions from '../components/SearchSuggestions/SearchSuggestions';

const AllMovies = () => {
  return (
    <Fragment>
      <InputSearch />
      <SearchSuggestions />
    </Fragment>
  );
};

export default AllMovies;
